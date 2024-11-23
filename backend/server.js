const express = require("express");
const connectDB = require("./config/connectDB");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// import routes
const cvRoutes = require("./routes/cv.routes");

const app = express();

// load environment variables
dotenv.config();

// connect to database
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes path
app.get("/api/v1", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API running successfully",
  });
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use("/api/v1/cv", cvRoutes);

// error handling middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message,
    error: err,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
