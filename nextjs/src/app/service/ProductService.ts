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

export const getProductsCategory = async (
  categoryId: number
): Promise<Products> => {
  try {
    const response = await woocommerceClient.get("/products", {
      params: {
        category: categoryId,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching products: ${error}`);
  }
};

export const getCategories = async (): Promise<any> => {
  try {
    const response = await woocommerceClient.get("/products/categories");

    return response.data.map((category: any) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      image: category.image,
      description: category.description,
    }));
  } catch (error) {
    throw new Error(`Error fetching categories: ${error}`);
  }
};

export const getProducts = async (): Promise<any> => {
  try {
    const response = await woocommerceClient.get("/products");

    return response.data;
  } catch (error) {
    throw new Error(`Error fetching products: ${error}`);
  }
};
