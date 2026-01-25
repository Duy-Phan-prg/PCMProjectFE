import React from 'react';

interface Category {
    id: number;
    name: string;
    image: string;
    icon: string;
}

const categories: Category[] = [
    {
        id: 1,
        name: 'Cơm trưa',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        icon: 'fa-solid fa-bowl-rice'
    },
    {
        id: 2,
        name: 'Đồ uống',
        image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        icon: 'fa-solid fa-glass-water'
    },
    {
        id: 3,
        name: 'Merchandise',
        image: 'https://images.unsplash.com/photo-1589365278144-bd4074529b21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        icon: 'fa-solid fa-shirt'
    },
    {
        id: 4,
        name: 'Healthy Food',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        icon: 'fa-solid fa-leaf'
    },
    {
        id: 5,
        name: 'Coffee',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        icon: 'fa-solid fa-mug-hot'
    },
    {
        id: 6,
        name: 'Văn phòng phẩm',
        image: 'https://plus.unsplash.com/premium_photo-1664302152994-33d32d3d9e83?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        icon: 'fa-solid fa-pen'
    }
];

const CategoryList: React.FC = () => {
    return (
        <div className="container mx-auto px-4 mt-10">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-fpt-blue border-l-4 border-fpt-orange pl-3">
                    Danh mục sản phẩm
                </h3>
                <a href="#" className="text-sm font-semibold text-fpt-orange hover:underline hidden md:flex items-center space-x-1">
                    <span>Xem tất cả</span>
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category, index) => (
                    <div
                        key={category.id}
                        className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer text-center group border border-transparent hover:border-fpt-orange relative overflow-hidden"
                        style={{
                            animationDelay: `${index * 50}ms`
                        }}
                    >
                        {/* Background gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-fpt-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative z-10">
                            {/* Icon overlay */}
                            <div className="w-12 h-12 mx-auto mb-3 bg-fpt-orange/10 group-hover:bg-fpt-orange rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                                <i className={`${category.icon} text-xl text-fpt-orange group-hover:text-white transition-colors`}></i>
                            </div>
                            
                            {/* Image */}
                            <div className="w-full aspect-video rounded-xl overflow-hidden mb-3 shadow-sm">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>
                            
                            <span className="font-semibold text-gray-700 group-hover:text-fpt-orange transition-colors text-sm">
                                {category.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
