import React, { useState } from "react";
import { useNavigate } from "react-router";
import Home from "./Home";
const Login = (props) => {
  const [credentails, setCredentails] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API Calls
    const response = await fetch(`http://localhost:4000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentails.email,
        password: credentails.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //   save the authtoken and redirect
      localStorage.setItem("auth-token", json.authToken);
      props.showAlert("Logged In!", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Credentails it is danger", "danger");
    }
  };

  const onChange = (e) => {
    setCredentails({ ...credentails, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h1>Login</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            value={credentails.email}
            name="email"
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={credentails.password}
            name="password"
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
