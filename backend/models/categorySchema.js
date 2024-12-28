const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  productS: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
});

module.exports = mongoose.model("Category", categorySchema);
