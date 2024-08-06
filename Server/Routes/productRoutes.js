const express = require("express");
const productControl = require("../controlers/productControl")
const auth = require("../middleware/auth");

const authAdmin = require("../middleware/authAdmin");

const route = express.Router();

route.post("/insert-products", productControl.insertProducts);

route.route("/product")
.get(productControl.getProduct)
.post(productControl.createProduct)

route.route("/product/:id")
.delete(productControl.deleteProduct)
.put(productControl.updateProduct)

module.exports = route;
