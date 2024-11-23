const { uploadCv, searchCV } = require("../controllers/cv.controller");
const uploadCvFiles = require("./../middleware/uploadCv");

const express = require("express");

const router = express.Router();

router.get("/search", searchCV);
router.post("/upload", uploadCvFiles.single("cv"), uploadCv);

module.exports = router;
