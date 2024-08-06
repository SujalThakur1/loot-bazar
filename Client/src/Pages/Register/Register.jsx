import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (user.email === "" || user.pass === "" || user.name === "") {
        setError("All fields are required.");
      } else {
        setError("");
        await axios.post(
          "https://loot-bazar-lwt5xh0ir-sujal-thakurs-projects-ec0a914c.vercel.app",
          { ...user },
          { withCredentials: true }
        );
        localStorage.setItem("firstRegister", true);
        window.location.href = "/";
      }
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  return (
    <div className="HeadContainer">
      <div className="sign-in-form">
        <h2>Sign Up</h2>
        <p>Please enter your details</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Name">Username (required)</label>
            <input
              type="name"
              id="name"
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              placeholder="Enter your name"
            />
          </div>

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
              placeholder="Enter your mail address"
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
          {error && <p className="errorr">{error}</p>}
          <button type="submit">Sign Up</button>
          <div className="signUp">
            <label htmlFor="Signup">Already on LootBazar? </label>
            <Link className="link" to={"/login"}>
              <label htmlFor="Signup" id="signUp">
                {" "}
                Sign In
              </label>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
