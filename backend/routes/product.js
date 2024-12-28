const express = require("express");

const {
  getAllProduct,
  creatNewProduct,
  getProductByCategoryId,
  deleteCategoryById,
  updateProductById,
} = require("../controllers/product");

const productRouter = express.Router();
getProductByCategoryId;
productRouter.post("/", creatNewProduct);
productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProductByCategoryId);
// productRouter.get("/:id",getProductById)
productRouter.put("/:id" ,updateProductById)
productRouter.delete("/:id" ,deleteCategoryById)


module.exports = productRouter;
