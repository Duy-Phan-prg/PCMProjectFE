import React from 'react';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import Banner from '../../components/layouts/Banner';
import CategoryList from '../../components/adminPage/CategoryList';
import ProductList from '../../components/adminPage/ProductList';

const HomePage: React.FC = () => {
    return (
        <div className="bg-fpt-gray min-h-screen">
            <Header />
            <Banner />
            <CategoryList />
            <ProductList />
            <Footer />
        </div>
    );
};

export default HomePage;
