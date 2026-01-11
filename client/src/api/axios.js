import axios from "axios";

const instance = axios.create({
  // import.meta.env.VITE_API_URL toma el valor de .env local o de Netlify automaticamente
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4006/api",
  withCredentials: true,
});

export default instance;
