import React, { useState, useContext } from "react";
import { userContext } from "../../App";
import axios from "axios";

const AddCategory = () => {
   const { userCreds, categoryList, setCategoryList} =
      useContext(userContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handelChange = (e) => {
    setCategoryList(e.target.value);
  };
  const handelCreateCategory = () => {
    axios
      .post("http://localhost:5000/category", {name: categoryList },
        { headers: { Authorization: `Bearer ${userCreds.token}` } }
        
      )
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
