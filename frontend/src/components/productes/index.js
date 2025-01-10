import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { userContext } from "../../App";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import Favorites from "../favorites";

const Products = () => {
  const {
    userCreds,
    cartList,
    setProductList,
    setCartList,
    productList,
    isLoggedIn,
    favoriteList,
    setFavoriteList,
  } = useContext(userContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [showRestSearch, setShowRestSearch] = useState(false);

  const addToCart = (productId) => {
    console.log(productId);

    axios
      .post(
        "http://localhost:5000/cart/add",
        { productId: productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${userCreds.token}` } }
      )
      .then((result) => {
        console.log("result.data.result", result.data.result);

        setCartList([...cartList, result.data.result.products]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const removeFromCart = (productId) => {
    axios
      .post(
        "http://localhost:5000/cart/remove",
        { productId: productId },
        { headers: { Authorization: `Bearer ${userCreds.token}` } }
      )
      .then((result) => {
        console.log("result.data.result", result.data.result);

        setCartList([...cartList, result.data.result.products]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addToFavourite = (productId) => {
    axios
      .put(
        `http://localhost:5000/users/updateUser/${userCreds.payload.userId}`,
        {
          productId,
        }
      )
      .then((result) => {
        setFavoriteList(result.data.result);
        console.log("favoriteList", favoriteList);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/product/${id}`, {
        headers: { Authorization: `Bearer ${userCreds.token}` },
      })
      .then((result) => {
        setProductList(productList.filter((prod) => prod._id != id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const searchProducts = () => {
    setShowRestSearch(true);
    setProductList(
      productList.filter(
        (prod) =>
          prod.name.includes(searchName) ||
          prod.description.includes(searchName)
      )
    );
  };

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  return (
    <div className="home">
      <div className="navbar-search">
        <input
          type="text"
          name="search"
          onChange={handleSearchChange}
          placeholder="Search ..."
        />
        <button type="submit" onClick={searchProducts}>
          <i className="fas fa-search"></i>
        </button>
        {showRestSearch && (
          <button type="submit" onClick={() => window.location.reload()}>
            Rest Search
          </button>
        )}
      </div>
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
                <div className="product-buttons">
                  <button onClick={() => removeFromCart(product._id)}>
                    <i className="fas fa-shopping-cart-red">X</i>
                  </button>
                  <button onClick={() => addToCart(product._id)}>
                    <i className="fas fa-shopping-cart"></i>
                  </button>
                  <button onClick={() => addToFavourite(product._id)}>
                    <i className="fas fa-heart"></i>
                  </button>
                  {isLoggedIn &&
                    userCreds.payload?.role?.permissions?.product?.includes(
                      "PUT"
                    ) && (
                      <button
                        onClick={() =>
                          navigate("/editProduct", {
                            state: { id: product._id },
                          })
                        }
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    )}
                  {isLoggedIn &&
                    userCreds.payload?.role?.permissions?.product?.includes(
                      "DELETE"
                    ) && (
                      <button
                        className="delete-button"
                        onClick={() => deleteProduct(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                </div>
              </div>
            ))
          : !error && <p>No products found.</p>}
      </div>
    </div>
  );
};

export default Products;
