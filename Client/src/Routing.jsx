import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./Routing.css";
import Nav from "./Components/Nav/Nav";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import Login from "./Pages/Login/Login";
import { DataProvider } from "./Global";
import Product from "./Pages/Product/Product";
import Register from "./Pages/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import PrivateRoute from "./Components/PrivateRoute";
function Routing() {
  return (
    <div className="route">
      <DataProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route element={<PrivateRoute redirectTo="/" />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/product/:id" element={<Product />} />
            <Route path="/Register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default Routing;
