import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { userContext } from "../../App";
import "./style.css";
import { useLocation, useParams } from "react-router-dom";

const EditProduct = () => {
  const [editProduct, seteditProduct] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    categoryId: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { categoryList, productList, userCreds, setProductList } =
    useContext(userContext);
  const location = useLocation();

  const handelChange = (e) => {
    seteditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handelUpdateProduct = (id) => {
    axios
      .put(
        `http://localhost:5000/product/${id}`,
        { ...editProduct },
        { headers: { Authorization: `Bearer ${userCreds.token}` } }
      )
      .then((result) => {
        console.log("result", result);
        setMessage(result.data.message);
        let newList = productList.filter((prod) => prod.id != id);
        newList.push(result.data.product);
        setProductList(newList);
        setError("");
      })
      .catch((err) => {
        setMessage("");
        setError(err.response.data.message);
      });
  };

  useEffect(() => {
    seteditProduct(productList.find((prod) => prod._id == location.state.id));
  }, []);
  return (
    <div className="newProdect">
      <h2>Edit Product</h2>
      <input
        type="text"
        name="name"
        value={editProduct.name}
        placeholder="Product Name"
        onChange={handelChange}
      />
      <input
        type="text"
        name="image"
        value={editProduct.image}
        placeholder="Image URL"
        onChange={handelChange}
      />
      <input
        type="number"
        name="price"
        value={editProduct.price}
        placeholder="Product Price"
        onChange={handelChange}
      />
      <textarea
        name="description"
        value={editProduct.description}
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
        value={editProduct.categoryId}
        onChange={handelChange}
      >
        <option value="">Select a Category</option>
        {categoryList.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <button onClick={() => handelUpdateProduct(editProduct._id)}>
        Update Product
      </button>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default EditProduct;
