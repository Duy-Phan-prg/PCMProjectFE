import React from 'react';
import Banner from '../../components/Banner';
import CategoryList from '../../components/CategoryList';
import ProductList from '../../components/ProductList';

const HomePage: React.FC = () => {
    return (
        <div className="bg-fpt-gray min-h-screen">
            {/* <Header /> */}
            <Banner />
            <CategoryList />
            <ProductList />
            {/* <Footer /> */}
        </div>
    );
};

export default HomePage;
