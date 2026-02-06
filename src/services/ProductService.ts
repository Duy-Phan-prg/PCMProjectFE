import type { Product } from "../types/Product";
import type { ApiResponse } from "../types/ApiResponse";
import axios from "../api/axios";

/* ================= GET ALL ================= */
export const getProducts = async (): Promise<Product[]> => {
  const res = await axios.get<ApiResponse<Product[]>>("/products");
  return res.data.payload ?? [];
};

/* ================= DELETE ================= */
export const deleteProduct = async (
  productId: number
): Promise<void> => {
  await axios.delete(`/products/${productId}`);
};

/* ================= GET BY ID ================= */
export const getProductById = async (
  id: number
): Promise<Product | null> => {
  const res = await axios.get<ApiResponse<Product>>(
    `/products/${id}`
  );
  return res.data.payload ?? null;
};

/* ================= CREATE ================= */
export const createProduct = async (
  formData: FormData
): Promise<Product> => {
  const res = await axios.post<ApiResponse<Product>>(
    "/products/createProduct",
    formData
  );

  if (!res.data.payload) {
    throw new Error("Create product failed");
  }

  return res.data.payload;
};

/* ================= UPDATE ================= */
export const updateProduct = async (
  id: number,
  formData: FormData
): Promise<Product> => {
  const res = await axios.put<ApiResponse<Product>>(
    `/products/${id}`,
    formData
  );

  return res.data.payload!;
};

/* ================= SEARCH ================= */
export const searchProducts = async (
  keyword: string
): Promise<Product[]> => {
  try {
    const res = await axios.get<Product[]>(
      "/products/search",
      {
        params: { keyword: keyword.trim() }
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

/* ================= BY CATEGORY ================= */
export const getProductsByCategoryId = async (
  categoryId: number
): Promise<Product[]> => {
  const res = await axios.get<ApiResponse<Product[]>>(
    "/products",
    {
      params: { categoryId }
    }
  );
  return res.data.payload ?? [];
};
