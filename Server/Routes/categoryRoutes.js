const express = require("express");
const categoryControl = require("../controlers/categoryControl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const route = express.Router();
route.get("/category", categoryControl.getCategories);
route.post("/category",auth, authAdmin, categoryControl.createCategories);
route.delete("/category/:id",auth,authAdmin,categoryControl.deleteCategory)
route.put("/category/:id",auth,authAdmin,categoryControl.updateCategory)

module.exports = route;
