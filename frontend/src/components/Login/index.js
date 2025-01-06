import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import axios from "axios";

const Login = () => {
  const { setUserCreds, setIsLoggedIn, setFavoriteList, setCartList } =
    useContext(userContext);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, seterror] = useState("");
  const navigate = useNavigate("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:5000/users/login", loginData)
      .then((result) => {
        const { userCreds, cartList, favoriteList } = result.data;
        console.log(result.data);

        localStorage.setItem("userCreds", JSON.stringify(userCreds));
        setCartList(cartList);
        setUserCreds(userCreds);
        setFavoriteList(favoriteList);
        setIsLoggedIn(true);
        navigate("/homePage");
      })
      .catch((error) => {
        seterror(error.response.data.message);
      });
  };

  return (
    <div className="login">
      <h3>Login:</h3>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Login;
