// response khi GET
export interface GetCategoryResponse {
  categoryId: number;
  categoryName: string;
}

// request khi CREATE
export interface CreateCategoryRequest {
  categoryName: string;
}

// response khi CREATE
export interface CreateCategoryResponse {
  categoryId: number;
  categoryName: string;
}
