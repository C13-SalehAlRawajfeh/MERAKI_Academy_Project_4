const Login = () => {
 
    const handleChange = (e) => {
     
    };
  
  const handleLogin = () => {
  
  }
  
    return (
      <div className="login">
        <h3>Login:</h3>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  };
  
  export default Login;