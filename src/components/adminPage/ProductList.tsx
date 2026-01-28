import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts, getProductsByCategoryId } from "../../services/ProductService";
import type { Product } from "../../types/Product";


interface ProductListProps {
  categoryId?: number | null;
}

const ProductList: React.FC<ProductListProps> = ({ categoryId }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const fetch = async () => {
            try {
            const data = categoryId
                ? await getProductsByCategoryId(categoryId)
                : await getProducts();

            setProducts(data);
            } finally {
            setLoading(false);
            }
        };

        fetch();
        }, [categoryId]);

    if (loading) {
        return (
            <div className="text-center py-10 text-gray-500">
                Loading...
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                Hiện không có sản phẩm nào
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 mt-12 mb-20">
            <div className="flex justify-between items-end mb-4">
                <h3 className="text-xl font-bold text-fpt-blue border-l-4 border-fpt-green pl-3">
                    Sản phẩm
                </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        image={product.imageUrl}
                        stockQuantity={product.stockQuantity}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
