// config/axios.ts
import axios from "axios";
import type { AxiosRequestConfig, Method } from "axios";
import { AUTH_SERVER_URL } from "./env.ts";

const api = axios.create({
  baseURL: AUTH_SERVER_URL,
  timeout: 10000,
});

interface RequestOptions {
  body?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  config?: AxiosRequestConfig;
}

export const apiRequest = async (
  method: Method,
  path: string,
  options: RequestOptions = {}
) => {
  const { body, params, headers, config } = options;

  const response = await api.request({
    url: path,
    method,
    data: body,
    params,
    headers,
    ...config,
  });

  return response.data;
};

export default api;
