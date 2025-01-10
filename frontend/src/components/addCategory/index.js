import React, { useState, useContext } from "react";
import { userContext } from "../../App";
import axios from "axios";
import "./style.css";

const AddCategory = () => {
  const { userCreds, categoryList, setCategoryList } = useContext(userContext);
  const [message, setMessage] = useState("");
  const [categoryData, setCategoryData] = useState({ name: "" });
  const [error, setError] = useState("");
  const handelChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };
  const handelCreateCategory = () => {
    axios
      .post(
        "http://localhost:5000/category",
        { ...categoryData },
        { headers: { Authorization: `Bearer ${userCreds.token}` } }
      )
      .then((result) => {
        setMessage(result.data.message);
        setCategoryList([...categoryList, result.data.category]);
        setError("");
      })
      .catch((err) => {
        setMessage("");
        setError(err.response.data.message);
      });
  };

  return (
    <div className="newCategory">
      <h2>Add New Category</h2>
      <input
        type="text"
        name="name"
        placeholder="Category Name"
        onChange={handelChange}
      />
      <button onClick={handelCreateCategory}>Create Category</button>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default AddCategory;
