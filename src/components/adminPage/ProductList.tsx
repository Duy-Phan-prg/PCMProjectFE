import React from 'react';
import ProductCard from './ProductCard';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    badge?: 'hot' | 'bestseller';
}

const products: Product[] = [
    {
        id: 1,
        name: 'Cơm Gà Hải Nam',
        description: 'Cơm gà luộc thảo mộc, canh rong biển, dưa chua nhà làm.',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        badge: 'bestseller'
    },
    {
        id: 2,
        name: 'Burger Bò F-Style',
        description: 'Bò nướng than, phô mai Cheddar, sốt đặc biệt FPT.',
        price: 60000,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        badge: 'hot'
    },
    {
        id: 3,
        name: 'Áo Polo FPT 35 Năm',
        description: 'Chất liệu Coolmate thoáng mát, logo thêu nổi.',
        price: 150000,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    },
    {
        id: 4,
        name: 'Kem Ý Gelato',
        description: 'Vị Dâu, Socola, Vani. Tráng miệng tuyệt vời.',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    }
];

const ProductList: React.FC = () => {
    return (
        <div className="container mx-auto px-4 mt-12 mb-20">
            <div className="flex justify-between items-end mb-4">
                <h3 className="text-xl font-bold text-fpt-blue border-l-4 border-fpt-green pl-3">
                    Sản phẩm phổ biến
                </h3>
                <a
                    href="#"
                    className="text-sm font-semibold text-fpt-orange hover:underline flex items-center"
                >
                    Xem tất cả <i className="fa-solid fa-angles-right ml-1"></i>
                </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
