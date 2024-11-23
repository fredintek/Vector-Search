const fs = require("fs");
const pdfParse = require("pdf-parse");
const { generateEmbeddings, cosineSimilarity } = require("../config/openAi");
const Cv = require("../models/cv.model");
const catchAsync = require("../utils/catchAsync");

exports.uploadCv = catchAsync(async (req, res, next) => {
  const foundCV = await Cv.findOne({ name: req.body.name });

  if (foundCV) {
    return next(new Error("CV with the same name already exists"));
  }

    // console.log("REQUEST FILE", req.file);

  const pdfBuffer = fs.readFileSync(req.file.path);
  const pdfContent = (await pdfParse(pdfBuffer)).text;
  //   console.log("PDF CONTENT", pdfContent);

  // generate embedding
  try {
    const vector = await generateEmbeddings(pdfContent);
    //   create cv
    const cv = new Cv({
      name: req.body.name,
      content: pdfContent.trim(),
      vector: vector.data.data[0].embedding,
      downloadUrl: `${process.env.SERVER_URL}/uploads/${req.file.filename}`
    });
    await cv.save();

    return res.status(200).json({
      status: "success",
      message: "CV uploaded successfully",
      vectorEmbedding: vector.data.data[0].embedding,
    });
  } catch (error) {
    return next(error);
  }
});

exports.searchCV = catchAsync(async (req, res, next) => {
  const { query } = req.body;

  if (!query) {
    return next(new Error("Query is required"));
  }

  try {
    // Fetch all CVs
    const cvs = await Cv.find();

    // generate query embedding
    const queryVector = await generateEmbeddings(query);

    // Calculate similarity
    const results = cvs
      .map((cv) => ({
        name: cv.name,
        downloadUrl: cv.downloadUrl,
        content: cv.content,
        similarity: cosineSimilarity(
          queryVector.data.data[0].embedding,
          cv.vector
        ),
      }))
      .sort((a, b) => b.similarity - a.similarity);

    return res.status(200).json({
      status: "success",
      message: "CVs retrieved successfully",
      results,
    });
  } catch (error) {
    return next(error);
  }
});
