import React, { useEffect, useContext } from "react";
import { userContext } from "../../App";
import axios from "axios";
import "./style.css";

const Categories = () => {
  const {
    categoryList,
    setCategoryList,
    setProductList, 
  } = useContext(userContext);

 
  useEffect(() => {
    axios
      .get("http://localhost:5000/categories") 
      .then((response) => {
        setCategoryList(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [setCategoryList]);

  const getProductsByCategory = (categoryId) => {
    axios
      .get(`http://localhost:5000/products/category/${categoryId}`) 
      .then((response) => {
        setProductList(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  return (
    <div className="categories-page">
      <h1>Categories</h1>
      <div className="categories-container">
        {categoryList.length > 0 ? (
          categoryList.map((category) => (
            <div key={category._id} className="category-card">
              <img
                src={category.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdAyElhEoY9DgDWlWSWb7IOxh3-gHBb7qFwQ&s"} 
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
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
