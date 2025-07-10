 import axios from "axios";

export  const photographers = async()=>{
    try{
      const response = await axios.get('http://localhost:3001/photographers');
      return response.data;
      console.log(response.data)
    } catch (error){
      console.error("error fetching photographers",error);
      throw error;
    }

  }