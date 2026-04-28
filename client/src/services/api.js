import axios from "axios";

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:5000/api"
  : "https://transmittal-system.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;