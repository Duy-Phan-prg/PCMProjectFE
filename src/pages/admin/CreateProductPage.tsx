import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/ProductService";
import CategoryService  from "../../services/CategoryService";
import type { GetCategoryResponse } from "../../types/Category";
import "./ProductForm.css";

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stockQuantity, setStockQuantity] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<GetCategoryResponse[]>([]);
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await CategoryService.getCategories();
      setCategories(res.data.payload);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    if (!categoryId) {
      alert("Please select a category");
      return;
    }

    if (!productName.trim()) {
      alert("Product name is required");
      return;
    }

    const product = {
      productName,
      description,
      price,
      stockQuantity,
      categoryId, 
    };

    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], {
        type: "application/json",
      })
    );
    formData.append("imageFile", imageFile);

    setLoading(true);
    try {
      await createProduct(formData);
      alert("Product created successfully");
      navigate("/admin/product");
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <div className="form-wrapper">
        <h1>Create New Product</h1>
        
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="productName">Product Name *</label>
            <input
              id="productName"
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price *</label>
              <input
                id="price"
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                min={1}
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stockQuantity">Stock Quantity *</label>
              <input
                id="stockQuantity"
                type="number"
                placeholder="Enter stock quantity"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(Number(e.target.value))}
                min={0}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="categoryId">Category *</label>
            <select
              id="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              required
            >
              <option value="">-- Select a Category --</option>
              {categories.map((c) => (
                <option key={c.categoryId} value={c.categoryId}>
                  {c.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageFile">Product Image *</label>
            <div className="image-upload">
              <input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
            <button 
              type="button" 
              onClick={() => navigate("/admin/product")}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
