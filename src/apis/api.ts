import axios from "axios";

const BASE_URL = "http://3.35.102.134:8080/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
