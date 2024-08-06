const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ msg: "example" });
});

app.listen(PORT, () => {
  console.log("Running");
});

//routes

app.use("/user", require("./Routes/useRouter"));
app.use("/api", require("./Routes/categoryRoutes"))
app.use("/api", require("./Routes/productRoutes"))
//MONGO DB

const URI = process.env.MONGODB_URL;
mongoose
  .connect(URI, {
  })
  .then(() => {
    console.log("mongo connected");
  })
  .catch((error) => {
    console.log(error);
  });
