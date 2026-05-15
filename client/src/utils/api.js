import axios from "axios";

const defaultApiUrl = import.meta.env.PROD
  ? "https://task-manager-ethara.onrender.com/api"
  : "http://localhost:5002/api";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultApiUrl,
  withCredentials: true,
});

// 🔐 Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;