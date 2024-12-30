const express = require("express");

const {
  deleteFromCart,
  addToCart,
  updateCart,
} = require("../controllers/cart");

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.put("/update", updateCart);
cartRouter.delete("/remove", deleteFromCart);

module.exports = cartRouter;
