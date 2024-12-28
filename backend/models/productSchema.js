const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img : {type: URL ,required:true},
  price : {type: Number , required: true},
  description : {type: String , required: true},
  categoryId :{type: mongoose.Schema.Types.ObjectId, ref: "categorySchema"},
});

module.exports = mongoose.model("Product", productSchema);