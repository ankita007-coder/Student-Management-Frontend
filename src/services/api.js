import axios from "axios";

export const axiosFetch = axios.create({
  baseURL: "https://student-management-backend-2f9p.onrender.com", 
});