import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const pubAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

export const privateAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

privateAxios.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("tmcAuthToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateAxios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest) {
      if (typeof window !== "undefined") {
        const refreshToken = Cookies.get("tmcRefreshToken");

        if (refreshToken) {
          try {
            const response = await pubAxios.post("/auth/refresh", {
              refresh_token: refreshToken,
            });

            if (response.data.access_token) {
              Cookies.set("tmcAuthToken", response.data.access_token);
              originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
              return privateAxios(originalRequest);
            }
          } catch (refreshError) {
            Cookies.remove("tmcAuthToken");
            Cookies.remove("tmcRefreshToken");
            Cookies.remove("tmcUserData");
            window.location.href = "/login";
          }
        } else {
          Cookies.remove("tmcAuthToken");
          Cookies.remove("tmcRefreshToken");
          Cookies.remove("tmcUserData");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);
