const Register = () => {

    const handelChange =(e) => {

    }

    const handelRegister = () => {

    }
  return (
    <div className="Register">
        <h3>Register:</h3>
      <input placeholder="First Name" name="firstName" type="text" onChange={handelChange}/>
      <input placeholder="Last Name" name="lastName" type="text" onChange={handelChange}/>
      <input placeholder="Age" name="age" type="number" onChange={handelChange}/>
      <input placeholder="Country" name="country" type="text" onChange={handelChange}/>
      <input placeholder="Email" name="email" type="email" onChange={handelChange}/>
      <input placeholder="Password" name="password" type="password" onChange={handelChange}/>
      <button onClick={handelRegister}>Register</button>
    </div>
  );
};

export default Register
