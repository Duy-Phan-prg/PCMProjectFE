export interface Category {
    categoryId: string;
    categoryName: string;
}
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: Category;
}