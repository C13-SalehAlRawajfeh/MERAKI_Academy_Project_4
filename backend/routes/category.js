const express = require("express");

const {
  createNewCategory,
  getAllCategory,
  updateCategoryById,
  getCategoryById,
  deleteCategoryById,
} = require("../controllers/category");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const CategoryRouter = express.Router();

CategoryRouter.get("/", getAllCategory);
CategoryRouter.get("/:id", authentication, authorization('category'),getCategoryById);
CategoryRouter.post("/", authentication, authorization('category'), createNewCategory);
CategoryRouter.put("/:id", authentication, authorization('category'),updateCategoryById);
CategoryRouter.delete("/:id", authentication, authorization('category'),deleteCategoryById);

module.exports = CategoryRouter;
