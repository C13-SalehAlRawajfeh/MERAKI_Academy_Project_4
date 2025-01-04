import React, { useState, useContext } from "react";
import axios from "axios";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handelChange = (e) => {
    setCategoryName(e.target.value);
  };
  const handelCreateCategory = () => {
    axios
      .post("http://localhost:5000/category", {name: categoryName })
      .then((result) => {
        setMessage(result.data.message);
        setError("");
      })
      .catch((err) => {
        setMessage("")
        setError(err.response.data.message)
      })
  };

  return (
    <div className="newCategory">
        <input type="text" name="name" placeholder="Category Name" onChange={handelChange}/>
        <button onClick={handelCreateCategory}>Creatr Category</button>
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
    </div>
  )
};

export default AddCategory;
