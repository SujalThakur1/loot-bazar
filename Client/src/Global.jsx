import React, { createContext, useState, useEffect } from "react";
import useProductApi from "./Api/ProductApi";
import axios from "axios";
export const GlobalState = createContext();
import UserApi from "./Api/UserApi";

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState("false");
  const [total, setTotal] = useState(0);
  const [Cart, setCart] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const {
    products: [products, setProducts],
  } = useProductApi();

  useEffect(() => {
    if (products.length > 0) {
      setOriginalProducts(products);
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    const calculateTotal = () => {
      const newTotal = Cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      setTotal(newTotal);
    };
    calculateTotal();
  }, [Cart]);

  const refreshToken = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/refresh_token", {
        withCredentials: true,
      });
      console.log(res)
      setToken(res.data.accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    const firstRegister = localStorage.getItem("firstRegister");
    if (firstLogin || firstRegister) {
      refreshToken();
    }
  }, []);

  const filterByName = (value) => {
    const lowercasedValue = value.toLowerCase();
    const newFilteredProducts = originalProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(lowercasedValue) ||
        product.category.toLowerCase().includes(lowercasedValue)
    );
    setFilteredProducts(newFilteredProducts);
  };

  const addToCart = async (product, fromServer = false) => {
    try {
      const productIndex = Cart.findIndex(
        (item) => item.product._id === product._id
      );
      let updatedCart = [];

      if (productIndex >= 0) {
        // Product exists in the cart, increase the quantity
        updatedCart = Cart.map((item, index) =>
          index === productIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Product does not exist in the cart, add it with quantity 1
        updatedCart = [...Cart, { product, quantity: 1 }];
      }

      setCart(updatedCart);

      if (!fromServer) {
        const response = await axios.post(
          "http://localhost:3000/user/updateUser",
          { cart: updatedCart },
          {
            headers: { Authorization: token },
          }
        );
      }
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const removeFromCart = async (product) => {
    try {
      const productIndex = Cart.findIndex(
        (item) => item.product._id === product._id
      );
      if (productIndex >= 0) {
        let updatedCart = [...Cart];
        if (updatedCart[productIndex].quantity > 1) {
          updatedCart[productIndex].quantity -= 1;
        } else {
          updatedCart = updatedCart.filter(
            (item) => item.product._id !== product._id
          );
        }

        setCart(updatedCart);

        await axios.post(
          "http://localhost:3000/user/updateUser",
          { cart: updatedCart },
          {
            headers: { Authorization: token },
          }
        );
      }
    } catch (error) {
      console.error(
        "Error removing from cart:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const state = {
    token: [token, setToken],
    Cart: [Cart, setCart],
    products: [filteredProducts, setFilteredProducts],
    addToCart,
    removeFromCart,
    filterByName,
    Total: [total, setTotal],
    userAPI: UserApi(token, setCart),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
