import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-backend-o98s.onrender.com/api",
});

export default API;