import axios from 'axios';
import Cookies from 'js-cookie';

import API_HOST from '../../API/api';

export const http = axios.create({
  baseURL: `${API_HOST}:5257/api`,
  timeout: 20000,
});

http.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;

    // اگر توکن نامعتبر شد، برگرد به لاگین
    if (status === 401) {
      Cookies.remove('token');
      window.location.href = '/login';
      return;
    }

    return Promise.reject(error);
  }
);
