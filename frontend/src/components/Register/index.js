import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";

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
    axios.post("http://localhost:5000/users/register", { ...Data, role: "67752c67a15292b62d01bedc" })
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
      <input
        placeholder="First Name"
        name="firstName"
        type="text"
        onChange={handelChange}
      />
      <input
        placeholder="Last Name"
        name="lastName"
        type="text"
        onChange={handelChange}
      />
      <input
        placeholder="Phone Number"
        name="phoneNumber"
        type="number"
        onChange={handelChange}
      />
      <input
        placeholder="Country"
        name="country"
        type="text"
        onChange={handelChange}
      />
      <input
        placeholder="Email"
        name="email"
        type="email"
        onChange={handelChange}
      />
      <input
        placeholder="Password"
        name="password"
        type="password"
        onChange={handelChange}
      />
      <button onClick={handelRegister}>Register</button>
    </div>
  );
};

export default Register;
