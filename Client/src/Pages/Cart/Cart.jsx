import React, { useEffect, useContext, useState } from "react";
import { GlobalState } from "../../Global";
import "./Cart.css";

function Cart() {
  const state = useContext(GlobalState);
  const [Cart] = state.Cart;
  const [productCount, setProductCount] = useState({});
  const [Total] = state.Total;
  const addToCart = state.addToCart;
  const removeFromCart = state.removeFromCart;
  const [isLogged] = state.userAPI.isLogged;

  useEffect(() => {
    const initialProductCount = Cart.reduce((acc, item) => {
      acc[item.product._id] = { ...item.product, count: item.quantity };
      return acc;
    }, {});
    setProductCount(initialProductCount);
  }, [Cart]);

  if (!isLogged) {
    return (
      <div className="errorr">
        <h1>Please Log in to access your cart</h1>
      </div>
    );
  }

  if (Cart.length < 1) {
    return (
      <div className="errorr">
        <h1>Looks like you haven't added anything yet. Let's go shopping!</h1>
      </div>
    );
  }

  return (
    <div className="HeadContainerCart">
      <div className="CartContainer">
        <div className="head">
          <h1>Shopping Cart</h1>
        </div>
        {Object.values(productCount).map((product) => (
          <div key={product._id} className="CartDetails">
            <div className="imageContainer">
              <img src={product.image} alt="product" />
            </div>
            <div className="hero">
              <h1 id="title">{product.title}</h1>
              <h2 id="price">₹{product.price}</h2>
              <div className="quantityBtn">
                <button onClick={() => removeFromCart(product)}>-</button>
                <h2>{product.count}</h2>
                <button onClick={() => addToCart(product)}>+</button>
              </div>
            </div>
          </div>
        ))}
        <div className="Total">
          <h1>
            Total ({Cart.reduce((sum, item) => sum + item.quantity, 0)} items) :
            ₹{Math.floor(Total * 100) / 100}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Cart;
