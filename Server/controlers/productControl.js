const Products = require("../models/productModel");
const { findByIdAndUpdate } = require("../models/userModel");

const productControl = {
  getProduct: async (req, res) => {
    try {
      const products = await Products.find();
      return res.json({ Products: products });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        productID,
        title,
        price,
        description,
        content,
        image,
        category,
        checked,
        sold,
      } = req.body;
      const product = await Products.findOne({ productID });
      if (product) {
        return res.status(400).json({ msg: "Product already exist" });
      }

      const newProduct = new Products({
        productID,
        title,
        price,
        description,
        content,
        image,
        category,
        checked,
        sold,
      });
      await newProduct.save();
      res.json({ msg: "New product created" });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        productID,
        title,
        price,
        description,
        content,
        image,
        category,
        checked,
        sold,
      } = req.body;
      await Products.findByIdAndUpdate(
        { _id: req.params.id },
        {
          productID,
          title,
          price,
          description,
          content,
          image,
          category,
          checked,
          sold,
        }
      );
      res.json("updated");
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete({ _id: req.params.id });

      res.json({ msg: "Deleted Successfully" });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  },
  insertProducts: async (req, res) => {
    try {
      const products = req.body;
      if (!Array.isArray(products)) {
        return res
          .status(400)
          .json({ msg: "Data should be an array of products" });
      }

      const result = await Products.insertMany(products);
      res.json({ message: `${result.length} products inserted successfully` });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = productControl;
