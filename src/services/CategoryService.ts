import type { AxiosResponse } from "axios";
import type { GetCategoryResponse } from "../types/Category";
import type { ApiResponse } from "../types/ApiResponse";
import type { CreateCategoryRequest } from "../types/Category";
import type { CreateCategoryResponse } from "../types/Category";
import { CATEGORY_URL } from "../constants/apiEndPoints";
import { apiUtils } from "../api/axios";

const CategoryService = {

    async getCategories(): Promise<AxiosResponse<ApiResponse<GetCategoryResponse[]>>> {
        console.log("API Call: getCategories");
        console.log("Full URL:", CATEGORY_URL);

        const response = await apiUtils.get<ApiResponse<GetCategoryResponse[]>>(
            CATEGORY_URL
        );
        console.log("API Response:", response);
        return response;
    },

    async createCategory(
        data: CreateCategoryRequest
    ): Promise<AxiosResponse<ApiResponse<CreateCategoryResponse>>> {
        return await apiUtils.post<ApiResponse<CreateCategoryResponse>>(
            CATEGORY_URL,
            data
        );
    },

    async deleteCategory(
        categoryId: number
    ): Promise<AxiosResponse<ApiResponse<null>>> {
        return await apiUtils.delete<ApiResponse<null>>(
            `${CATEGORY_URL}/${categoryId}`
        );
    },

    async updateCategory(
        categoryId: number,
        data: { categoryName: string }
    ): Promise<AxiosResponse<ApiResponse<CreateCategoryResponse>>> {
        return await apiUtils.put<ApiResponse<CreateCategoryResponse>>(
            `${CATEGORY_URL}/${categoryId}`,
            data
        );
    }
};
export default CategoryService;

