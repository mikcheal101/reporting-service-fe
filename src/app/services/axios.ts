// app/services/axios.ts
import axios from "axios";

const api = axios.create({
  withCredentials: true,
});

// Globally handle 401
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // redirect to login
      if (globalThis.location.pathname !== '/signin') {
        globalThis.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

export default api;