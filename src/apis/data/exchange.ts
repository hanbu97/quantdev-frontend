import { API_BASE } from "@/config/api";
import { apiClient } from "@/lib/api";

export const getExchangeInfo = async () => {
  try {
    const data = await apiClient.get(`${API_BASE}/data/exchange`);
    return data;
  } catch (error) {
    console.error("getExchangeInfo error:", error);
  }
};
