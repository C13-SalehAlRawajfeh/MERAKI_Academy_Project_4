import React, { useEffect, useContext, useState } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Categories = () => {
  const { categoryList } = useContext(userContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProductsByCategory = (categoryId) => {
    axios
      .get(`http://localhost:5000/product/${categoryId}`)
      .then((response) => {
        setProducts(response.data.result);
        setSelectedCategory(categoryId);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const goBackToCategories = () => {
    setSelectedCategory(null);
    setProducts([]);
  };
  const addToCart = () => {};
  const addToFavorite = () => {};

  return (
    <div className="categories-page">
      {selectedCategory ? (
        <div className="products-page">
          <button className="back-button" onClick={goBackToCategories}>
            Back to Categories
          </button>
          <h1 className="page-title">Products</h1>
          <div className="products-container">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="product-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">Price: ${product.price}</p>
                  <div className="product-buttons">
                    <button onClick={addToCart}>
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                    <button onClick={addToFavorite}>
                      <i className="fas fa-heart"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data-message">No products found.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="categories-container">
          <h1 className="page-title">Categories</h1>
          <div className="categories-grid">
            {categoryList.length > 0 ? (
              categoryList.map((category) => (
                <div key={category._id} className="category-card">
                  <img
                    src={
                      category.image ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdAyElhEoY9DgDWlWSWb7IOxh3-gHBb7qFwQ&s"
                    }
                    alt={category.name}
                    className="category-image"
                  />
                  <h3 className="category-name">{category.name}</h3>
                  <button
                    className="view-products-button"
                    onClick={() => getProductsByCategory(category._id)}
                  >
                    View Products
                  </button>
                </div>
              ))
            ) : (
              <p className="no-data-message">No categories found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
