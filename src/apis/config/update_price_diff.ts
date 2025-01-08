import { API_BASE } from "@/config/api";
import { apiClient } from "@/lib/api";

export const updateConfigPriceDiff = async (priceDiff: string) => {
  try {
    const data = await apiClient.post(
      `${API_BASE}/config/update_price_diff?key=Quantdev_key_20250107`,
      {
        price_diff: priceDiff,
      }
    );
    return data;
  } catch (error) {
    console.error("updateConfigPriceDiff error:", error);
    throw error;
  }
};
