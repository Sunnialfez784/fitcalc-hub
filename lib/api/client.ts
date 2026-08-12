import axios from "axios";

/**
 * Axios instance for client-side API calls.
 * Prefer Server Components / Route Handlers when possible.
 */
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/api` : "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Placeholder — centralize error toasts / redirects later
    return Promise.reject(error);
  },
);

export default api;
