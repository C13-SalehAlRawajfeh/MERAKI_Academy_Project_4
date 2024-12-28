const categoryModel = require("../models/categorySchema");

const createNewCategory = (req, res) => {
  const { name } = req.body;
  const newCategory = new categoryModel({ name });
  newCategory
    .save()
    .then((result) => {
      // console.log(result);

      res.status(201).json({
        success: true,
        message: `category created`,
        category: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getAllCategory = (req, res) => {
  categoryModel
    .find()
    // .populate("Product")
    // .exec()
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the category",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "server error",
        error: err,
      });
    });
};

const getCategoryById = (req, res) => {
  const categoryId = req.params.id;

  categoryModel
    .findById(categoryId)
    // .populate("product")
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `category with id ${categoryId} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `the category ${categoryId}`,
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "server error",
        error: err,
      });
    });
};

const updateCategoryById = (req, res) => {
  const categoryId = req.params.id;
  const { name, image } = req.body;

  categoryModel
    .findOneAndUpdate(
      { _id: categoryId },
      {
        $set: {
          name: name,
          image: image,
        },
      },
      { new: true }
    )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `category with id ${categoryId} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: "category updated",
        result: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "server error",
        err: err,
      });
    });
};

const deleteCategoryById = (req, res) => {
  const categoryId = req.params.id;

  categoryModel
    .findByIdAndDelete(categoryId)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "category deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    });
};

module.exports = {
  createNewCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
