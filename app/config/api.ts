"use client";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
if (typeof window !== "undefined") {
  //ingest jwt token from localstorage into every request
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  //handles auth error globally
  api.interceptors.request.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_token");
        //only redirect if not already on auth pages
        if (
          !window.location.pathname.includes("/login") &&
          !window.location.pathname.includes("/register")
        ) {
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    },
  );
}

export default api;
