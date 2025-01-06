import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { userContext } from "../../App";
import "./style.css";

const HomePage = () => {
  const { userCreds, cartList, setCartList, productList } =
    useContext(userContext);
  const [error, setError] = useState("");

  const addToCart = (productId) => {
    axios
      .post(
        "http://localhost:5000/cart/add",
        { productId: productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${userCreds.token}` } }
      )
      .then((result) => {
        setCartList([...cartList, result.data.result.products]);
      })
      .catch((err) => {});
  };
  const addToFavorite = () => {};

  useEffect(() => {});

  return (
    <div className="home">
      <h1>All Products</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="products-container">
        {productList.length > 0
          ? productList.map((product) => (
              <div key={product._id} className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Price: ${product.price}</p>
                <button onClick={() => addToCart(product._id)}>
                  Add To Cart
                </button>
                <button onClick={addToFavorite}>Favorite</button>
              </div>
            ))
          : !error && <p>No products found.</p>}
      </div>
    </div>
  );
};
export default HomePage;
