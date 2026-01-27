import React, { useEffect, useState } from 'react';
import type { Product } from '../../types/Product';
import { getProducts, deleteProduct } from '../../services/ProductService';
import ProductTable from '../../components/product/ProductTable';
import EmptyState from '../../components/product/EmptyState';

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    getProducts()
      .then((data) => {
        setProducts(data.payload);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm("Do you want to delete this product?")) return;

    try {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((product) => product.id !== productId));
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-2">Manage your product catalog</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search & Actions Bar */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Add Product
          </button>
          <button onClick={fetchProducts} className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
            Refresh
          </button>
        </div>

        {/* Content States */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin mb-4">⏳</div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        )}

        {!loading && filteredProducts.length > 0 && (
          <ProductTable products={filteredProducts} onDelete={handleDeleteProduct} />
        )}

        {!loading && products.length > 0 && filteredProducts.length === 0 && (
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="text-gray-500">No products match your search</p>
          </div>
        )}

        {!loading && products.length === 0 && <EmptyState />}
      </div>
    </div>
  );
};

export default ProductPage;