const productModel = require("../models/productSchema");

const creatNewProduct = (req, res) => {
  const { name, image, price, description, categoryId } = req.body;

  const newProduct = new productModel({
    name,
    image,
    price,
    description,
    categoryId,
  });

  newProduct
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Product created`,
        Product: result,
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

const getAllProduct = (req, res) => {
  productModel
    .find()
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the Product",
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

const getProductByCategoryId = (req, res) => {
  const categoryId = req.params.id;

  productModel
    .find({ categoryId })
    // .populate("product")
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `Product with id ${categoryId} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `the Product ${categoryId}`,
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

module.exports = { getAllProduct, creatNewProduct, getProductByCategoryId };
