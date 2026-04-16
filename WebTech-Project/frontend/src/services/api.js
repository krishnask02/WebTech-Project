import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const loginUser = (data) => API.post("/auth/login", data);

export const signupUser = (data) => API.post("/auth/signup", data);

export const getPlaces = () => API.get("/places");

export const addPlace = (data) => API.post("/places", data);

export const saveItinerary = (data) => API.post("/itinerary", data);

export const getItinerary = () => API.get("/itinerary");

export const saveExpenses = (data) => API.post("/expenses", data);

export const getExpenses = () => API.get("/expenses");

export default API;