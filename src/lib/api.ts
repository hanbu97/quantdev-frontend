// src/apis/index.ts
import axios, { AxiosResponse } from "axios";
import { AxiosError } from "axios";

interface ApiResponse<T = any> {
  code: number;
  msg: T;
}

const API_BASE_URL = "/apis";

export const rawApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 创建包装客户端
class WrappedApiClient {
  async request<T = any>(
    config: Parameters<typeof rawApiClient.request>[0]
  ): Promise<T> {
    try {
      const response: AxiosResponse<ApiResponse<T>> =
        await rawApiClient.request(config);

      if (response.status === 200) {
        // console.log("response.data", response.data);
        const { code, msg } = response.data;

        if (code != null) {
          // successCodeToast(code.toString());
          return msg;
        } else {
          return response.data as any;
        }
      } else {
        return response.data as any;
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        const errorData = error.response.data as ApiResponse;
        // errorCodeToast(errorData.code.toString());
      }
      throw error;
    }
  }

  // 便捷方法
  async get<T = any>(url: string, config = {}): Promise<T> {
    return this.request({ ...config, method: "GET", url });
  }

  async post<T = any>(url: string, data?: any, config = {}): Promise<T> {
    return this.request({ ...config, method: "POST", url, data });
  }
}

export const apiClient = new WrappedApiClient();
