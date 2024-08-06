import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../Global";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const state = useContext(GlobalState);
  const [product, setProduct] = state.products;
  const addToCart = state.addToCart;
  const [loading, setLoading] = useState(true);
  const [isLogged] = state.userAPI.isLogged;

  useEffect(() => {
    if (product.length > 0) {
      setLoading(false);
    }
  }, [product]);

  const truncateTitle = (title, charLimit) => {
    if (title.length >= charLimit) {
      return {
        text: title.substring(0, charLimit) + "...",
        className: "small-text",
      };
    } else if (title.length > 26) {
      return {
        text: title,
        className: "small-text",
      };
    }
    return { text: title, className: "" };
  };

  if (loading) {
    return (
      <div className="errorNoResult">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!loading && product.length === 0) {
    return (
      <div className="errorNoResult">
        <h2>No Results Found</h2>
        <p>Try checking your spelling or use more general terms.</p>
      </div>
    );
  }
  return (
    <div className="products">
      {product.map((product) => {
        const { text, className } = truncateTitle(product.title, 55);

        return (
          <div key={product._id} className="product">
            <Link className="link" to={`/product/${product._id}`}>
              <img src={product.image} alt="error" />
            </Link>
            <Link className="link" to={`/product/${product._id}`}>
              <h1 className={className}>{text}</h1>
            </Link>
            <Link className="link" to={`/product/${product._id}`}>
              <p>₹{product.price}</p>
            </Link>
            <div className="buttons" style={isLogged?{}:{justifyContent:"center"}}>
              <Link to={`/product/${product._id}`}>
                <button className={"view"}>View</button>
              </Link>
              {
                isLogged?<button className="AddToCart" onClick={() => addToCart(product)}>
                Add To Cart
              </button>:null
              }
              
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
