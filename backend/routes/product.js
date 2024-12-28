const express = require("express");

const {getAllProduct,creatNewProduct,getProductByCategoryId} =require("../controllers/product")

const productRouter = express.Router();
getProductByCategoryId
productRouter.post("/",creatNewProduct)
productRouter.get("/",getAllProduct)
productRouter.get("/:id",getProductByCategoryId)








module.exports = productRouter