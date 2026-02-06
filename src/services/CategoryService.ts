import type { GetCategoryResponse } from "../types/Category";
import type { ApiResponse } from "../types/ApiResponse";
import type {
  CreateCategoryRequest,
  CreateCategoryResponse
} from "../types/Category";
import { CATEGORY_URL } from "../constants/apiEndPoints";
import { apiUtils } from "../api/axios";

const CategoryService = {

  /* ================= GET ================= */
  async getCategories(): Promise<GetCategoryResponse[]> {
    const res = await apiUtils.get<ApiResponse<GetCategoryResponse[]>>(
      CATEGORY_URL
    );
    return res.data.payload ?? [];
  },

  /* ================= CREATE ================= */
  async createCategory(
    data: CreateCategoryRequest
  ): Promise<CreateCategoryResponse> {
    const res = await apiUtils.post<ApiResponse<CreateCategoryResponse>>(
      CATEGORY_URL,
      data
    );
    return res.data.payload!;
  },

  /* ================= DELETE ================= */
  async deleteCategory(
    categoryId: number
  ): Promise<void> {
    await apiUtils.delete<ApiResponse<null>>(
      `${CATEGORY_URL}/${categoryId}`
    );
  },

  /* ================= UPDATE ================= */
  async updateCategory(
    categoryId: number,
    data: { categoryName: string }
  ): Promise<CreateCategoryResponse> {
    const res = await apiUtils.put<ApiResponse<CreateCategoryResponse>>(
      `${CATEGORY_URL}/${categoryId}`,
      data
    );
    return res.data.payload!;
  }
};

export default CategoryService;
