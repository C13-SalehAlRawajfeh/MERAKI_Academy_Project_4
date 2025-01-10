import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import "./style.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { userCreds, setUserCreds, isLoggedIn, setIsLoggedIn } =
    useContext(userContext);

  const handelLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("userCreds");
    setUserCreds({});
    navigate("/homePage");
    setIsLoggedIn(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-header">
        <h1 className="title">My E-Commerce</h1>
        <div className="user-info">
          {Object.keys(userCreds || {}).length > 0 ? (
            <>
              <span className="username">
                Welcome {userCreds?.payload?.userName}
              </span>
              <button className="logout-btn" onClick={handelLogout}>
                Logout
              </button>
              <Link to="/cart">
                <i className="fas fa-shopping-cart"></i>
              </Link>
              <Link to="/favorites">
                <i className="fas fa-heart"></i>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>

      <div className="navbar-links">
        <Link to="/homePage">Home</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/products">Products</Link>
        <Link to="/ContactUs">Contact Us</Link>
        <Link to="/aboutUs">About Us</Link>
        {isLoggedIn &&
          userCreds.payload?.role?.permissions?.product?.includes("POST") && (
            <Link to="/addProduct">Add Product</Link>
          )}
        {isLoggedIn &&
          userCreds.payload?.role?.permissions?.category?.includes("POST") && (
            <Link to="/addCategory">Add Category</Link>
          )}
      </div>
    </div>
  );
};

export default Navbar;
