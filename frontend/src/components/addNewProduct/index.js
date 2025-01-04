import React, { useState, useContext ,useEffect } from "react";
import axios from "axios";


const NewProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([])
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/category") 
      .then((response) => {
        setCategories(response.data.result);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories");
      });
  }, []);

  const handelChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handelCreateProduct = () => {
    axios
      .post("http://localhost:5000/product", { ...productData })
      .then((result) => {
        setMessage(result.data.message);
        setError("");
      })
      .catch((err) => {
        setMessage("");
        setError(err.response.data.message);
      });
  };
  return (
    <div className="newProdect">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        onChange={handelChange}
      />
      <input
        type="text"
        name="image"
        placeholder="Image Product"
        onChange={handelChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price Product"
        onChange={handelChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Product Description"
        onChange={handelChange}
      />
      <select
        name="categoryId"
        value={productData.categoryId}
        onChange={handelChange}
      >
        <option value="">Select a Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <button onClick={handelCreateProduct}>Add New Product</button>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default NewProduct;
