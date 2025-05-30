import axios from "axios";

const BASE_URL = "https://api.tranner.com/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
