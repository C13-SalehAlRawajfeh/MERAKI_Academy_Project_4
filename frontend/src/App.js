import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import HomePage from "./components/homePage";

export const userContext = createContext();

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token" || ""));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setToken(true);
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
        </Routes>
      </div>
    </userContext.Provider>
  );
};

export default App;
