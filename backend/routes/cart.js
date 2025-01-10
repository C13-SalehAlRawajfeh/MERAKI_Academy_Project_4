const express = require("express");

const {
  deleteFromCart,
  addToCart,
  updateCart,
} = require("../controllers/cart");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const cartRouter = express.Router();

cartRouter.post("/add", authentication, authorization('cart'), addToCart);
cartRouter.put("/update/:id", authentication, authorization('cart'), updateCart);
cartRouter.post("/remove", authentication, authorization('cart'), deleteFromCart);

module.exports = cartRouter;
