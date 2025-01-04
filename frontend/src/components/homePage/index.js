import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { userContext } from "../../App";
import "./style.css"

const HomePage = () => {
  const { token} = useContext(userContext);
  const [Product, setProduct] = useState([]);
  const [error, setError] = useState("");

  const getAllProduct = () => {
    axios
      .get("http://localhost:5000/product", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        console.log("Fetched products:", result.data.result)
        setProduct(result.data.result);
        setError("");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  useEffect(() => {
    getAllProduct();
  },);

  return (
    <div className="home">
      <h1>All Products</h1>
      {error && <div className="error-message">{error}</div>} 
      <div className="products-container">
        {Product.length > 0 ? (
          Product.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Price: ${product.price}</p>
            </div>
          ))
        ) : (
          !error && <p>No products found.</p> 
        )}
      </div>
    </div>
  );
};
export default HomePage;
