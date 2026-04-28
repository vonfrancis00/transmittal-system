import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:5000/api"
    : "https://transmittal-system.onrender.com/api"
});

export default api;