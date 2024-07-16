import { woocommerceClient } from "../lib/wooCommerce";
import { Products } from "../types/product";

export const searchProducts = async (
  name: string = "",
  options: { per_page?: number } = { per_page: 100 }
): Promise<Products> => {
  try {
    const response = await woocommerceClient.get("/products", {
      params: {
        search: name,
        per_page: options.per_page,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Error fetching products: ${error}`);
  }
};
