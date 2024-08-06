const express = require("express");
const userControl = require("../controlers/userControl");
const auth = require("../middleware/auth");

const route = express.Router();

route.post("/register", userControl.register);
route.get("/refresh_token", userControl.refreshToken )
route.post("/login", userControl.login)
route.get("/logout", userControl.logout)
route.get("/information",auth,userControl.getUser)
route.post("/updateUser",auth,userControl.updateUser)
module.exports = route;
