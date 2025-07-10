import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [photographers, setPhotographers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  const [selectedPhotographer, setSelectedPhotographer] = useState(null);
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  useEffect(() => {
    const loadPhotographers = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3001/photographers');
        const data = await res.json();
        setPhotographers(data);
        setFiltered(data);
      } catch (err) {
        setError('Failed to load photographers');
      }
      setLoading(false);
    };
    loadPhotographers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedRating, selectedStyles, selectedCity, sortOption, priceRange]);

  const applyFilters = () => {
    let result = [...photographers];

    result = result.filter((p) => {
      const text = `${p.name} ${p.location} ${p.tags.join(' ')}`.toLowerCase();
      return text.includes(searchTerm.toLowerCase());
    });

    if (selectedRating) {
      result = result.filter((p) => p.rating >= parseFloat(selectedRating));
    }

    if (selectedStyles.length > 0) {
      result = result.filter((p) =>
        selectedStyles.every((style) => p.styles.includes(style))
      );
    }

    if (selectedCity) {
      result = result.filter((p) => p.location === selectedCity);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sortOption === 'priceLowHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'ratingHighLow') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'recent') {
      result.sort((a, b) => b.id - a.id);
    }

    setFiltered(result);
    setVisibleCount(3);
  };

  const handleStyleChange = (style) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Photographers</h1>

      <input
        type="text"
        placeholder="Search by name, location, or tag"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="filters-container">
        <div className="filter-group">
          <label>Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
          <input
            type="range"
            min="0"
            max="20000"
            step="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
          />
        </div>

        <div className="filter-group">
          <label>Rating:</label>
          {[4, 3, 2].map((r) => (
            <label key={r}>
              <input
                type="radio"
                name="rating"
                value={r}
                checked={selectedRating === r.toString()}
                onChange={(e) => setSelectedRating(e.target.value)}
              />
              {r}+
            </label>
          ))}
        </div>

        <div className="filter-group">
          <label>Styles:</label>
          {['Traditional', 'Candid', 'Studio', 'Outdoor'].map((style) => (
            <label key={style}>
              <input
                type="checkbox"
                checked={selectedStyles.includes(style)}
                onChange={() => handleStyleChange(style)}
              />
              {style}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <label>City:</label>
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">All</option>
            {[...new Set(photographers.map((p) => p.location))].map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Sort By:</label>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Default</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="ratingHighLow">Rating: High to Low</option>
            <option value="recent">Recently Added</option>
          </select>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <div className="loader">Loading photographers...</div>
      ) : filtered.length === 0 ? (
        <p className="no-results">😔 Sorry, we couldn't find any photographers matching your criteria.</p>
      ) : (
        <>
          {filtered.slice(0, visibleCount).map((photographer) => (
            <div key={photographer.id} className="card-container">
              <div className="card-left">
                <img
                  src={photographer.profilePic}
                  alt={photographer.name}
                  className="profile-pic"
                />
              </div>
              <div className="card-right">
                <h2 className="photographer-name">{photographer.name}</h2>
                <p className="photographer-location">📍 {photographer.location}</p>
                <p className="photographer-price">💰 ₹{photographer.price}</p>
                <p className="photographer-rating">⭐ {photographer.rating}</p>
                <p className="photographer-tags">Tags: {photographer.tags.join(', ')}</p>
                <button
                  className="view-profile-button"
                  onClick={() => setSelectedPhotographer(photographer)}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {!loading && visibleCount < filtered.length && (
        <div className="load-more-wrapper">
          {loadMoreLoading ? (
            <div className="loader">Loading more...</div>
          ) : (
            <button
              className="load-more"
              onClick={() => {
                setLoadMoreLoading(true);
                setTimeout(() => {
                  setVisibleCount(filtered.length);
                  setLoadMoreLoading(false);
                }, 1000);
              }}
            >
              Load More
            </button>
          )}
        </div>
      )}

      {/* Profile Modal */}
      {selectedPhotographer && (
        <div className="modal-overlay" onClick={() => setSelectedPhotographer(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedPhotographer(null)}>✕</button>
            <h2>{selectedPhotographer.name}</h2>
            <p>{selectedPhotographer.bio}</p>
            <p><strong>Price:</strong> ₹{selectedPhotographer.price}</p>
            <p><strong>Styles:</strong> {selectedPhotographer.styles.join(', ')}</p>
            <p><strong>Tags:</strong> {selectedPhotographer.tags.join(', ')}</p>

            <h3>Gallery</h3>
            <div className="gallery-grid">
              {selectedPhotographer.portfolio.map((img, idx) => (
                <img key={idx} src={img} alt="portfolio" className="gallery-img" />
              ))}
            </div>

            <h3>Reviews</h3>
            <div className="reviews-section">
              {selectedPhotographer.reviews.map((r, i) => (
                <div key={i} className="review-card">
                  <p><strong>{r.name}</strong> – ⭐ {r.rating}</p>
                  <p>{r.comment}</p>
                  <p className="review-date">{r.date}</p>
                </div>
              ))}
            </div>

            <button className="inquiry-button" onClick={() => setShowInquiryForm(true)}>
              Send Inquiry
            </button>
          </div>
        </div>
      )}

      {/* Inquiry Modal */}
      {showInquiryForm && (
        <div className="modal-overlay" onClick={() => setShowInquiryForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowInquiryForm(false)}>✕</button>
            <h2>Send Inquiry</h2>
            <form className="inquiry-form" onSubmit={(e) => {
              e.preventDefault();
              alert('Inquiry Sent!');
              setShowInquiryForm(false);
              setSelectedPhotographer(null);
            }}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Message or requirement" required />
              <button type="submit" className="submit-btn">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
