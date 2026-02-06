import type { ApiResponse } from "../types/ApiResponse";
import axios from "../api/axios";
import type { CartResponse } from "../types/Cart";

/* ================= ADD TO CART ================= */
export const addToCart = async (
  productId: number,
  quantity: number = 1
): Promise<void> => {
  await axios.post<ApiResponse<null>>(
    "/cart/add",
    null,
    {
      params: {
        productId,
        quantity,
      },
    }
  );
};

/* ================= GET CART ================= */
export const getCart = async (): Promise<CartResponse> => {
  const res = await axios.get<ApiResponse<CartResponse>>("/cart");

  if (!res.data.payload) {
    throw new Error("Cart not found");
  }

  return res.data.payload;
};

/* ================= DELETE CART ITEM ================= */
export const deleteCartItem = async (
  id: number
): Promise<void> => {
  await axios.delete(`/cart/item/${id}`);
};
