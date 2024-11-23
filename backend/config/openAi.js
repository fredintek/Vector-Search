const axios = require("axios");

// generate embeddings
exports.generateEmbeddings = async (text) => {
  return await axios.post(
    process.env.OPEN_AI_URL,
    { input: text },
    {
      headers: {
        "api-key": process.env.OPEN_AI_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
};

// Cosine similarity function
// exports.cosineSimilarity = (vecA, vecB) => {
//   const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
//   const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
//   const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
//   return dotProduct / (magnitudeA * magnitudeB);
// };

exports.cosineSimilarity = (vecA, vecB) => {
  if (vecA.length !== vecB.length) {
    throw new Error("Vectors must have the same length");
  }

  const dotProduct = vecA.reduce((sum, a, idx) => sum + (a * vecB[idx]), 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + (a * a), 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + (b * b), 0));

  if (magnitudeA === 0 || magnitudeB === 0) {
    throw new Error("One or both vectors have zero magnitude");
  }

  const similarity = dotProduct / (magnitudeA * magnitudeB);

  // Ensure result is within [-1, 1] due to floating-point imprecision
  return Math.min(Math.max(similarity, -1), 1);
};
