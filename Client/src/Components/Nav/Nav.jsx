import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import { GlobalState } from "../../Global";
import { useContext, useState } from "react";
import AppLogo from "../../assets/App Logo.png";
import CartLogo from "../../assets/CartLogo.png";
import "animate.css";
import axios from "axios";
export default function Nav() {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [adminLogged, setAdminLogged] = state.userAPI.adminLogged;
  const [user,setUser] = state.userAPI.user
  const [token,setToken] = state.token
  const [Cart,setCart] = state.Cart;
  const filterByName = state.filterByName;
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValue(e.target.value);
    filterByName(e.target.value);
    navigate("/");
  };
  const handleSearch = () => {
    filterByName(value);
    navigate("/");
  };

  const Login = () => {
    navigate("/login")
  };

  
  const totalQuantity = Cart.reduce((acc, item) => acc + item.quantity, 0);
  const Logout = async () =>{
    try {
       await axios.get("http://localhost:3000/user/logout");
       localStorage.clear()
       setAdminLogged(false)
       setIsLogged(false)
       setUser({})
       setToken(null)
       setCart([])
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="nav">
      <Link to={"/"}>
        <img src={AppLogo} alt="error" />
      </Link>
      <div className="search">
        <input type="search" value={value} onChange={handleChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="register">
        {" "}
        <button onClick={isLogged ? Logout : Login}>
          {isLogged ? "Log out" : "Log in"}
        </button>
      </div>

      <Link className="icon link" to={"/cart"}>
        <img src={CartLogo} alt="error" />
        <p>{totalQuantity}</p>
      </Link>
    </div>
  );
}
