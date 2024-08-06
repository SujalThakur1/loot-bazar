import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../Global";
import "./Product.css";
export default function Product() {
  const state = useContext(GlobalState);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products] = state.products;
  const addToCart = state.addToCart;
  const [isLogged] = state.userAPI.isLogged;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        // Wait for products to be available
        if (products.length === 0) {
          setError("No products available.");
        } else {
          const productDetails = products.find((pro) => pro._id === id);
          if (productDetails) {
            setProduct(productDetails);
            setError(null);
          } else {
            setError("Product Not Found");
          }
        }
      } catch (err) {
        setError("An error occurred while fetching the product details.");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch product if products are available
    if (products.length > 0) {
      fetchProduct();
    } else {
      setLoading(true); // Indicate loading while waiting for products to be fetched
    }
  }, [id, products]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="HeadContainer">
      <div className="container">
        <div className="image">
          <img src={product.image} alt="error" />
        </div>
        <div className="details">
          <h1>{product.title}</h1>
          <h2>{product.description}</h2>
          <h2>{product.content}</h2>
          <h1 className="price"> ₹{product.price}</h1>
          {isLogged?<button onClick={() => addToCart(product)}>Add To Cart</button>:null}
          
        </div>
      </div>
    </div>
  );
}
