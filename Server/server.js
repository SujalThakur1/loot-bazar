const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;

const app = express();

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173', // Development URL
  'https://loot-bazar-frontend.vercel.app' // Production URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) { // Allow requests with no origin (e.g., from curl or Postman)
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "example" });
});

// Routes
app.use("/user", require("./Routes/useRouter"));
app.use("/api", require("./Routes/categoryRoutes"));
app.use("/api", require("./Routes/productRoutes"));

// MongoDB Connection
const URI = process.env.MONGODB_URL;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
