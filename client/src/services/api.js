import axios from "axios";

export default axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://transmittal-api.onrender.com/api"
});