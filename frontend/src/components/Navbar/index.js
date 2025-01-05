import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import "./style.css";

const Navbar = () => {
  const { token, setToken, isLoggedIn, setIsLoggedIn } =
    useContext(userContext);
  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsLoggedIn(false);
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
                <span className="username">Welcome, User</span>
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
      <div className="navbar-links">
        <Link to="/homePage">Home</Link>
        <Link to="/addProduct">Add Product</Link>
        <Link to="/addCategory">Add Category</Link>
      </div>
      <dive className="navbar-search">
        <input type="text" name="search" placeholder="Search ..." />
        <button type="submit">Search</button>
      </dive>
    </div>
  );
};

export default Navbar;
