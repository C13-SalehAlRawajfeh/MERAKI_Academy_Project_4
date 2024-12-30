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
      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: `Products with category id ${categoryId} not found`,
        });
      }
      console.log(result);

      res.status(200).json({
        success: true,
        message: `the Products with category id ${categoryId}`,
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

const getProductById = (req, res) => {
  const ProductId = req.params.id;

  productModel
    .findById(ProductId)
    // .populate("product")
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `Product with id ${ProductId} not found`,
        });
      }
      // console.log(result);
      res.status(200).json({
        success: true,
        message: `the Product ${ProductId}`,
        result: result,
      });
    })
    .catch((err) => {
      console.log(ProductId);

      console.log(err);

      res.status(500).json({
        success: false,
        message: "server error",
        error: err,
      });
    });
};

const updateProductById = (req, res) => {
  const categorysId = req.params.id;
  const { name, image, price, description, categoryId } = req.body;

  productModel
    .findOneAndUpdate(
      { _id: categorysId },
      {
        $set: {
          name: name,
          image: image,
          price: price,
          description: description,
          categoryId: categoryId,
        },
      },
      { new: true }
    )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `Product with id ${categoryId} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: "Product updated",
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

  productModel
    .findByIdAndDelete(categoryId)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Product deleted",
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
  getAllProduct,
  creatNewProduct,
  getProductByCategoryId,
  getProductById,
  deleteCategoryById,
  updateProductById,
};
