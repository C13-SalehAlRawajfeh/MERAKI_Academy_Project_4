const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  image: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true, maxlength: 500 },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
});

module.exports = mongoose.model("Product", productSchema);
