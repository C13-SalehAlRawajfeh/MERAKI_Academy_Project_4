import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import HomePage from "./components/homePage";
import NewProduct from "./components/addNewProduct";
import AddCategory from "./components/addCategory";
import Cart from "./components/cart";
import axios from "axios";
import Favorites from "./components/favorites";
import ContactUs from "./components/contactUs";
import AboutUs from "./components/aboutUs";
export const userContext = createContext();

const App = () => {
  const [userCreds, setUserCreds] = useState(
    JSON.parse(localStorage.getItem("userCreds" || {}))
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);

  const getCategories = () => {
    axios
      .get("http://localhost:5000/category")
      .then((response) => {
        setCategoryList(response.data.result);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  };

  const getProducts = () => {
    axios
      .get("http://localhost:5000/product")
      .then((response) => {
        setProductList(response.data.result);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  };
  useEffect(() => {
    if (userCreds) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    getCategories();
    getProducts();
  }, [userCreds]);

  return (
    <userContext.Provider
      value={{
        userCreds,
        setUserCreds,
        isLoggedIn,
        setIsLoggedIn,
        cartList,
        setCartList,
        favoriteList,
        setFavoriteList,
        categoryList,
        setCategoryList,
        productList,
        setProductList,
      }}
    >
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addProduct" element={<NewProduct />} />
          <Route path="/addCategory" element={<AddCategory />} />
        </Routes>
      </div>
    </userContext.Provider>
  );
};

export default App;
