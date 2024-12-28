const categoryModel = require("../models/categorySchema");

const createNewCategory = (req, res) => {
  const { name, productS } = req.body;
  const newCategory = new categoryModel({ name, productS });
  newCategory
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `category created`,
        role: result,
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

const getAllCategory =(req,res) => {

}

module.exports = { createNewCategory ,getAllCategory};
