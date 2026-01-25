import React, { useState } from 'react';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount] = useState(3);

    return (
        <header className="bg-fpt-blue sticky top-0 z-50 shadow-lg backdrop-blur-sm bg-opacity-95 w-full">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center cursor-pointer hover:opacity-90 transition">
                    <div className="flex gap-0.5">
                        {/* F Block */}
                        <div className="relative w-8 h-11 flex items-center justify-center bg-fpt-blue rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm" style={{ transform: 'skewX(-15deg)' }}>
                            <span className="text-white text-3xl font-black italic" style={{ transform: 'skewX(5deg)' }}>F</span>
                        </div>
                        {/* P Block */}
                        <div className="relative w-8 h-11 flex items-center justify-center bg-fpt-orange rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm" style={{ transform: 'skewX(-15deg)' }}>
                            <span className="text-white text-3xl font-black italic" style={{ transform: 'skewX(5deg)' }}>P</span>
                        </div>
                        {/* T Block */}
                        <div className="relative w-8 h-11 flex items-center justify-center bg-fpt-green rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm" style={{ transform: 'skewX(-15deg)' }}>
                            <span className="text-white text-3xl font-black italic" style={{ transform: 'skewX(5deg)' }}>T</span>
                        </div>
                    </div>
                    <span className="text-white px-2 py-0.5 ml-2 text-2xl font-medium tracking-tight">
                        Store
                    </span>
                </div>

                {/* Search Bar - Desktop */}
                <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm (Ví dụ: Áo FPT, Cơm trưa...)"
                        className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border-none outline-none focus:ring-2 focus:ring-fpt-orange transition-all text-sm shadow-sm"
                    />
                    <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-gray-400"></i>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-6 text-white">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-fpt-orange transition-colors">
                        <i className="fa-solid fa-globe"></i>
                        <span className="text-sm font-medium">VN</span>
                    </div>
                    <div className="relative cursor-pointer hover:text-fpt-orange transition-colors group">
                        <i className="fa-solid fa-cart-shopping text-xl"></i>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-fpt-orange text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-fpt-blue group-hover:scale-110 transition-transform">
                                {cartCount}
                            </span>
                        )}
                    </div>
                    <div className="cursor-pointer hover:text-fpt-orange transition-colors">
                        <i className="fa-solid fa-circle-user text-2xl"></i>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-white text-2xl focus:outline-none hover:text-fpt-orange transition"
                >
                    <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-fpt-blue border-t border-blue-600 animate-fadeIn w-full">
                    <div className="w-full px-4 py-4 space-y-4 max-w-[1920px] mx-auto">
                        {/* Mobile Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border-none outline-none focus:ring-2 focus:ring-fpt-orange text-sm"
                            />
                            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-gray-400"></i>
                        </div>
                        
                        {/* Mobile Actions */}
                        <div className="flex items-center justify-around text-white pt-2">
                            <div className="flex flex-col items-center space-y-1 cursor-pointer hover:text-fpt-orange transition">
                                <i className="fa-solid fa-globe text-xl"></i>
                                <span className="text-xs">Ngôn ngữ</span>
                            </div>
                            <div className="flex flex-col items-center space-y-1 cursor-pointer hover:text-fpt-orange transition relative">
                                <i className="fa-solid fa-cart-shopping text-xl"></i>
                                <span className="text-xs">Giỏ hàng</span>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 right-6 bg-fpt-orange text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col items-center space-y-1 cursor-pointer hover:text-fpt-orange transition">
                                <i className="fa-solid fa-circle-user text-xl"></i>
                                <span className="text-xs">Tài khoản</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
