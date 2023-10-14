import axios, { InternalAxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4444/mern-blog',
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
