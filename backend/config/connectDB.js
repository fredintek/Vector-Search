const mongoose = require("mongoose");

// Connect to MongoDB
const connectDB = () =>
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to Mongodb"))
    .catch((err) => console.log(`MongoDB Connection Error: ${err}`));

module.exports = connectDB;
