# 📸 Pixisphere - Photographer Listing Web App

A modern, responsive React.js application to list and discover photographers, built as part of a frontend assignment for **Pixisphere**. The app includes dynamic filtering, searching, sorting, profile views, and an inquiry form — all wrapped in a clean, elegant UI using React and Material UI.

---

## 🚀 Features

### 🔍 Search & Filter
- **Search Bar** to find photographers by name, location, or tags.
- **Advanced Filters**:
  - ✅ Price Range Slider
  - ✅ Rating Filter (4+, 3+, etc.)
  - ✅ Style Selection (Traditional, Candid, Studio, Outdoor)
  - ✅ City Dropdown
- **Sorting Options**:
  - 📈 Price: Low to High
  - ⭐ Rating: High to Low
  - 🕓 Recently Added

### 🖼️ Listing & Pagination
- Photographer cards with image, name, location, tags, price, rating.
- Loads **3 cards initially**.
- "Load More" button reveals more cards.
- Animated loader while loading photographers and more results.

### 👤 View Profile Modal
- Clicking **"View Profile"** opens a modal with:
  - 📛 Name & Bio
  - 🎯 Styles & Tags
  - 💸 Price
  - 🖼️ Full Portfolio (Grid View)
  - ⭐ All Reviews (Name, Rating, Comment, Date)
  - ✉️ **Send Inquiry** button

### 📨 Inquiry Form Modal
- Beautiful form modal with:
  - Name
  - Email
  - Message/Requirements
- Submits with alert confirmation (mock logic).
- Auto-closes on success.

### ✅ UX Enhancements
- Loader spinner on initial load and Load More.
- Graceful "No results found" message.
- Fully responsive design (desktop + mobile).
- Clean, accessible, and aesthetic layout.

---

## 🛠️ Tech Stack

| Tech       | Description                     |
|------------|---------------------------------|
| React.js   | Frontend JavaScript framework   |
| Material UI| Component Library (used lightly)|
| CSS        | Custom styling                  |
| JSON Server| Mock REST API                   |

---


## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pixisphere-app.git
cd pixisphere-app
npm install
npx json-server --watch db.json --port 3001
npm start
```

## 📬 Contact
Made with ❤️ by Prakhar Johari
📧 prakharjohari28@gmail.com# pixisphere
