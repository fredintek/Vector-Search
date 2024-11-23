const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("application/pdf")) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the uploads folder as the destination
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    // Extract file extension
    const ext = path.extname(file.originalname); // e.g., '.pdf'

    // Create a unique filename with original extension
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `file-${uniqueSuffix}${ext}`); // Save as 'file-<uniqueSuffix>.pdf'
  },
});

module.exports = multer({
  //   dest: path.join(__dirname, "../uploads"),
  storage,
  fileFilter,
});
