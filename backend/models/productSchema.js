const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image : {type: String ,required:true},
  price : {type: Number , required: true},
  description : {type: String , required: true},
  categoryId :{type: mongoose.Schema.Types.ObjectId, ref: "category"},
});

module.exports = mongoose.model("Product", productSchema);