export interface GetCategoryResponse {
  categoryId: number;
  categoryName: string;
}

export interface CreateCategoryRequest {
  categoryName: string;
}

export interface CreateCategoryResponse{
  categoryId: number;
  categoryName: string;
}

export interface UpdateCategoryRequest {
  categoryName: string;
}