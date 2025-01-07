import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css"

const Register = () => {
  const [Data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "",
    email: "",
    password: "",
    fav: "",
  });
  const [message, setMessage] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const handelChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handelRegister = () => {
    axios.post("http://localhost:5000/users/register", { ...Data, role: "user" })
    .then((result) => {
       setMessage(result.data.message)
       seterror("")
       setTimeout(() => {
        navigate("/login")
       }, 2000);
    })
    .catch((error) => {
      setMessage("")
      seterror(error.response.data.message)
    })
  };
  return (
    <div className="Register">
      <h3>Register:</h3>
      <div className="input-container">
        <i className="fas fa-user"></i>
        <input
          placeholder="First Name"
          name="firstName"
          type="text"
          onChange={handelChange}
        />
      </div>
      <div className="input-container">
        <i className="fas fa-user"></i>
        <input
          placeholder="Last Name"
          name="lastName"
          type="text"
          onChange={handelChange}
        />
      </div>
      <div className="input-container">
        <i className="fas fa-phone"></i>
        <input
          placeholder="Phone Number"
          name="phoneNumber"
          type="number"
          onChange={handelChange}
        />
      </div>
      <div className="input-container">
        <i className="fas fa-globe"></i>
        <input
          placeholder="Country"
          name="country"
          type="text"
          onChange={handelChange}
        />
      </div>
      <div className="input-container">
        <i className="fas fa-envelope"></i>
        <input
          placeholder="Email"
          name="email"
          type="email"
          onChange={handelChange}
        />
      </div>
      <div className="input-container">
        <i className="fas fa-lock"></i>
        <input
          placeholder="Password"
          name="password"
          type="password"
          onChange={handelChange}
        />
      </div>
      <button onClick={handelRegister}>Register</button>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Register;
