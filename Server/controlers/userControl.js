const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userControl = {
  register: async (req, res) => {
    try {
      const { name, email, pass } = req.body;
      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "Email Already exist" });
      }

      const cryptPass = await bcrypt.hash(pass, 10);
      const newUser = new Users({
        name,
        email,
        pass: cryptPass,
      });

      await newUser.save();

      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });
      res.json({ refreshToken, accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, pass } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Incorrect email" });

      const isMatch = await bcrypt.compare(pass, user.pass);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      res.json({refreshToken})
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // Refresh token function
  refreshToken: async (req, res) => {
    try {
      const rfToken = req.cookies.refreshToken;
      if (!rfToken)
        return res
          .status(400)
          .json({ msg: "No refresh token, please log in again" });

      jwt.verify(rfToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) {
          console.error("Token verification error:", err);
          return res
            .status(400)
            .json({ msg: "Invalid refresh token", error: err });
        }

        const accessToken = createAccessToken({ id: user.id });
        return res.json({ user, accessToken });
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken", { path: "/user/refresh_token" });
      return res.json({ msg: "logout" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-pass");
      console.log(user);
      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }
      res.json({ user: user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const cartData = req.body.cart;

      if (!cartData) {
        return res.status(400).json({ msg: "Cart data is required" });
      }

      // Fetch the current user from the database
      const currentUser = await Users.findById(req.user.id);
      if (!currentUser) {
        return res.status(404).json({ msg: "User not found" });
      }

      // Update the user's cart with the new cart data
      currentUser.cart = cartData;

      // Save the updated user back to the database
      const updatedUser = await currentUser.save();

      return res.json(updatedUser);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: "1m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN, {
    expiresIn: "7d",
  });
};

module.exports = userControl;
