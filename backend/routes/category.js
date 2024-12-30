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

CategoryRouter.post("/", createNewCategory);
CategoryRouter.get("/", authentication, getAllCategory);
CategoryRouter.get("/:id", getCategoryById);
CategoryRouter.put("/:id", updateCategoryById);
CategoryRouter.delete("/:id", deleteCategoryById);

module.exports = CategoryRouter;
