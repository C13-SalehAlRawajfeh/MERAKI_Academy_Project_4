import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import "./style.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { userCreds, setUserCreds, isLoggedIn, setIsLoggedIn } =
    useContext(userContext);

  const handelLogout = () => {
    localStorage.removeItem("userCreds");
    setIsLoggedIn(false);
    setUserCreds({});
  };

  const handelSearch = () => {};

  return (
    <div className="navbar">
      <div>
        <div className="navbar-header">
          <h1 className="title">My E-Commerce</h1>
          <div className="user-info">
            {isLoggedIn ? (
              <>
                <span className="username">
                  Welcome, {userCreds?.payload?.userName}
                </span>
                <button onClick={handelLogout}>Logout</button>
                <Link to="/cart">Cart</Link>
                <Link to="/favorites">Favorites</Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to={"/register"}>register</Link>
              </>
            )}
          </div>
        </div>
      </div>
      {isLoggedIn ? (
        <div className="navbar-links">
          <Link to="/homePage">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/products">Products</Link>
          {userCreds.payload.role?.permissions?.product?.includes("POST") && (
            <Link to="/addProduct">Add Product</Link>
          )}
          {userCreds.payload.role?.permissions?.category?.includes("POST") && (
            <Link to="/addCategory">Add Category</Link>
          )}
        </div>
      ) : (
        <div className="navbar-links">
          <Link to="/homePage">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/products">Products</Link>
        </div>
      )}
      <dive className="navbar-search">
        <input type="text" name="search" placeholder="Search ..." />
        <button type="submit">Search</button>
      </dive>
    </div>
  );
};

export default Navbar;
