import { API_BASE } from "@/config/api";
import { apiClient } from "@/lib/api";

export const getConfigPriceDiff = async () => {
  try {
    const response = await apiClient.get(`${API_BASE}/config/price_diff`);
    console.log("API返回的原始数据:", response);
    return response;
  } catch (error) {
    console.error("getConfigPriceDiff error:", error);
    throw error;
  }
};
