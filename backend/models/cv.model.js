const mongoose = require("mongoose");

const CvSchema = new mongoose.Schema(
  {
    name: String,
    content: String,
    vector: [Number],
    downloadUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("cv", CvSchema);
