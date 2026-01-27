import type { Product } from "../types/Product";
import type { ApiResponse } from "../types/ApiResponse";

const API_URL = "http://localhost:8080/api/products/";

export const getProducts = async (): Promise<ApiResponse<Product[]>> => {
  const response = await fetch(API_URL + "getAll");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const deleteProduct = async (productId: string): Promise<ApiResponse<null>> => {
  const response = await fetch(API_URL + `delete/${productId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return response.json();
};