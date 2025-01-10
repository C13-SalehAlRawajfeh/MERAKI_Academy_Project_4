const express = require("express");

const {
  getAllProduct,
  creatNewProduct,
  getProductByCategoryId,
  deleteProductById,
  updateProductById,
  getProductById,
} = require("../controllers/product");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const productRouter = express.Router();

productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProductByCategoryId);
productRouter.get("/item/:id", getProductById);
productRouter.post(
  "/",
  authentication,
  authorization("product"),
  creatNewProduct
);
productRouter.put(
  "/:id",
  authentication,
  authorization("product"),
  updateProductById
);
productRouter.delete(
  "/:id",
  authentication,
  authorization("product"),
  deleteProductById
);

module.exports = productRouter;
