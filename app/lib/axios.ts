import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { ANON_SERVER_URL } from "@/app/constants";
import { useAuthStore } from "@/app/store/useAuth";

const api = axios.create({
  baseURL: ANON_SERVER_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        // const { refreshAccessToken } = useAuth();
        // const newToken = await refreshAccessToken(refreshToken!);

        // originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (error) {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
