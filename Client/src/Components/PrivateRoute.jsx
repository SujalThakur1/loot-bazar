import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GlobalState } from "../Global";
import { useContext } from "react";

const PrivateRoute = ({ redirectTo }) => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;

  return isLogged ? <Navigate to={redirectTo} /> : <Outlet />;
};

export default PrivateRoute;
