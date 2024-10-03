import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    pass: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (user.email === "" || user.pass === "") {
        setError("Both fields are required.");
      } else {
        setError("");
        await axios.post(
          "https://loot-bazar-o5gq5ns5f-sujal-thakurs-projects-ec0a914c.vercel.app/user/login",
          {
            ...user,
          },
          { withCredentials: true }
        );
        localStorage.setItem("firstLogin", true);
        window.location.href = "/";
      }
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  return (
    <div className="HeadContainer">
      <div className="sign-in-form">
        <h2>Sign In</h2>
        <p>Please enter your details</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email (required)</label>
            <input
              type="email"
              id="email"
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
              placeholder="Enter your email address"
            />
          </div>
          <div className="form-group password-group">
            <label htmlFor="password">Password (required)</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={(e) =>
                  setUser((prevState) => ({
                    ...prevState,
                    pass: e.target.value,
                  }))
                }
                placeholder="Enter password"
              />
              <span onClick={() => setShowPassword(!showPassword)} id="eye">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          {error && <p id="errorr">{error}</p>}
          <button type="submit">Sign In</button>
          <div className="signUp">
            <label htmlFor="Signup">Not a member yet? </label>
            <Link className="link" to={"/register"}>
              <label htmlFor="Signup" id="signUp">
                {" "}
                Sign up
              </label>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
