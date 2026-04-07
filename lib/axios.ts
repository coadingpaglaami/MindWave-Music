import axios from "axios";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "./cookies";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/accounts/token/refresh/`,
          {
            refresh: refreshToken,
          },
        );
        const newAccessToken = res.data.access;
        const newRefreshToken = res.data.refresh;
        setTokens(newAccessToken, newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (error) {
        console.log("Refresh Failed");
        clearTokens();
        if (typeof window != undefined) {
          window.location.href = "/login";
        }

        return Promise.reject(error);
      }
    }
  },
);
export { api as axios };
