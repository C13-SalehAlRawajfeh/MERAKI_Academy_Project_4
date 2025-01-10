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
        product: result,
      });
    })
    .catch((err) => {
      console.error("err", err);

      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getAllProduct = (req, res) => {
  // const userId = req.token.userId
  // const cartId =req.token.cartId
  productModel
    .find()
    .then((result) => {
      res.status(200).json({
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
      res.status(200).json({
        success: true,
        message: `the Product ${ProductId}`,
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

const updateProductById = (req, res) => {
  const productId = req.params.id;
  const { name, image, price, description, categoryId } = req.body;

  console.log("productId", productId);
  console.log("categoryId", categoryId);
  productModel
    .findOneAndUpdate(
      { _id: productId },
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
      console.log("result", result);
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

const deleteProductById = (req, res) => {
  const productId = req.params.id;
  productModel
    .findByIdAndDelete(productId)
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
  deleteProductById,
  updateProductById,
};
