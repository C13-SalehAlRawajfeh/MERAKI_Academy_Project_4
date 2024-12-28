const express = require("express");

const { createNewCategory,getAllCategory } = require("../controllers/category");

const authentication = require("../middleware/authorization");
const authorization = require("../middleware/authorization");

const CategoryRouter = express.Router();

CategoryRouter.post("/", createNewCategory);

module.exports = CategoryRouter;
