import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: `${apiUrl}/api`,
});

/* ================= REQUEST INTERCEPTOR ================= */
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Nếu là FormData → để axios tự set Content-Type
    if (config.data instanceof FormData && config.headers) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR ================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      sessionStorage.clear();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

/* ================= API UTILS ================= */
const apiUtils = {
  async get<T>(
    url: string,
    params?: object,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return api.get(url, { ...config, params });
  },

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return api.post(url, data, {
      ...config,
      headers: {
        ...(config?.headers || {}),
      },
    });
  },

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return api.put(url, data, config);
  },

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return api.delete(url, config);
  },

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return api.patch(url, data, config);
  },
};

export { apiUtils };
export default api;
