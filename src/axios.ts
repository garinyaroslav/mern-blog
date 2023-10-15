import axios, { InternalAxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}${'mern-blog'}`,
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
