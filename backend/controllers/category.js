const categoryModel = require("../models/categorySchema");

const createNewCategory = (req, res) => {
  const { name, productS, image } = req.body;
  const newCategory = new categoryModel({ name, productS, image });
  newCategory
    .save()
    .then((result) => {
        console.log(result);
        
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
            success:true ,
            message: "All the category" ,
            result :result
        })
    })
    .catch((err) => {
        res.status(500).json({
            success:false ,
            message : "server error" ,
            error : err
        })
    })
  
};

module.exports = { createNewCategory, getAllCategory };
