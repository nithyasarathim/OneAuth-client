import axios from "axios";
import { AUTH_SERVER_URL } from './env.ts';
import { TIMEOUT } from './env.ts';

const api = axios.create({
  baseURL: AUTH_SERVER_URL,
  withCredentials: true,
  timeout: TIMEOUT,
});

export default api;
