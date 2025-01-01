import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { userContext } from "../../App";

const HomePage = () => {
const {token,isLoggedIn} = useContext(userContext)
const [Product, seTProduct] = useState([])
const [error, setError] = useState("")
const [userId, setUserId] = useState("")

const getAllProduct = () => {
  axios
  .get("http://localhost:5000/product")
}
  return (<div className="home">
    <h1>All Product</h1>
    {error && <div className="error-message">{error}</div>}
    </div>)
};

export default HomePage;
