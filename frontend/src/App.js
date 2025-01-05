import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import HomePage from "./components/homePage";
import NewProduct from "./components/addNewProduct";
import AddCategory from "./components/addCategory";
export const userContext = createContext();

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token" || ""));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      console.log(token)
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);
  return (
    <userContext.Provider
      value={{ token, setToken, isLoggedIn, setIsLoggedIn }}
    >
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addProduct" element={<NewProduct />} />
          <Route path="/addCategory" element={<AddCategory />} />
        </Routes>
      </div>
    </userContext.Provider>
  );
};

export default App;
