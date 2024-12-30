import React from "react";
import "./App.css";
import Register from "./components/shared components/Register";
import Login from "./components/shared components/Login";
import Navbar from "./components/shared components/Navbar";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Register />
      <Login />
    </div>
  );
};

export default App;
