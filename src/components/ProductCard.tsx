import React, { useState } from 'react';

interface ProductCardProps {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    badge?: 'hot' | 'bestseller';
    rating?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, price, image, badge, rating = 4.5 }) => {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        setTimeout(() => setIsAdding(false), 600);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full relative group border border-transparent hover:border-fpt-orange/20">
            {badge && (
                <div
                    className={`absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg animate-pulse ${
                        badge === 'hot' ? 'bg-fpt-orange' : 'bg-fpt-green'
                    }`}
                >
                    {badge === 'hot' ? '🔥 HOT' : '⭐ Bán chạy'}
                </div>
            )}

            <div className="h-48 overflow-hidden relative bg-gray-100">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h4 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-fpt-blue transition-colors cursor-pointer line-clamp-1">
                    {name}
                </h4>
                
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <i
                            key={i}
                            className={`fa-solid fa-star text-xs ${
                                i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                        ></i>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({rating})</span>
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">{description}</p>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-fpt-orange font-bold text-xl">
                            {price.toLocaleString('vi-VN')}đ
                        </span>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`w-10 h-10 rounded-full bg-blue-50 text-fpt-blue hover:bg-fpt-orange hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 disabled:opacity-50 ${
                            isAdding ? 'animate-bounce bg-fpt-orange text-white' : ''
                        }`}
                    >
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
