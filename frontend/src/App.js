import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import HomePage from "./components/homePage";

export const userContext = createContext()

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token" || ""))
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if(token)
  })
  return (
    <div className="App">
      <Navbar />
      <HomePage/>
      <Register />
      <Login />
    </div>
  );
};

export default App;
