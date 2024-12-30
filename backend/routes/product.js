const express = require("express");

const {
  getAllProduct,
  creatNewProduct,
  getProductByCategoryId,
  deleteCategoryById,
  updateProductById,
  getProductById,
} = require("../controllers/product");

const productRouter = express.Router();
getProductByCategoryId;
productRouter.post("/", creatNewProduct);
productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProductByCategoryId);
productRouter.get("/item/:id", getProductById);
productRouter.put("/:id", updateProductById);
productRouter.delete("/:id", deleteCategoryById);

module.exports = productRouter;
