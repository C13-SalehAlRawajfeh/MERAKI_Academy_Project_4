import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { userContext } from "../../App";
import "./style.css"

const NewProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    categoryId: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { categoryList, productList, setProductList } = useContext(userContext);

  const handelChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handelCreateProduct = () => {
    axios
      .post("http://localhost:5000/product", { ...productData })
      .then((result) => {
        setMessage(result.data.message);
        setProductList(...productList, result.data.product);
        setError("");
      })
      .catch((err) => {
        setMessage("");
        setError(err.response.data.message);
      });
  };
  return (
    <div className="newProdect">
      <h2>Add New Product</h2>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        onChange={handelChange}
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        onChange={handelChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Product Price"
        onChange={handelChange}
      />
      <textarea
        name="description"
        placeholder="Product Description"
        rows="4"
        onChange={handelChange}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          fontSize: "1rem",
          boxSizing: "border-box",
        }}
      />
      <select
        name="categoryId"
        value={productData.categoryId}
        onChange={handelChange}
      >
        <option value="">Select a Category</option>
        {categoryList.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <button onClick={handelCreateProduct}>Add Product</button>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default NewProduct;
