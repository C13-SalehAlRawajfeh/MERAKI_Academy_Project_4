const cartModel = require("../models/cartSchema");

const deleteFromCart = (req, res) => {
  const { cartId, productId } = req.body;

  cartModel
    .findByIdAndUpdate(
      cartId,
      { $pull: { products: { productId: productId } } },
      { new: true }
    )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `Cart with id ${cartId} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Product removed from cart`,
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};

const addToCart = (req, res) => {
  const { userId, productId, quantity } = req.body;

  cartModel
    .findOneAndUpdate(
      { userId: userId, "products.productId": productId },
      {
        $inc: { "products.$.quantity": quantity },
      },
      { new: true }
    )
    .then((result) => {
      if (!result) {
        return cartModel
          .findOneAndUpdate(
            { userId: userId },
            {
              $addToSet: { products: { productId, quantity } },
            },
            { upsert: true, new: true }
          )
          .then((newResult) => {
            res.status(200).json({
              success: true,
              message: "Product added to cart",
              result: newResult,
            });
          });
      }
      res.status(200).json({
        success: true,
        message: "Product quantity updated in cart",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};

const updateCart = (req, res) => {
  const { cartId, productId, quantity } = req.body;

  cartModel
    .findOneAndUpdate(
      { _id: cartId, productId: productId },
      { $set: { quantity: quantity } },
      { new: true }
    )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `Cart or product not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: "Cart updated",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};

module.exports = { deleteFromCart, addToCart, updateCart };
