import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useProductApi() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get("https://loot-bazar-api.onrender.com/api/product");
      setProducts(res.data.Products);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products: [products, setProducts],
  };
}
