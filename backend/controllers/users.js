const userModel = require("../models/userSchema");
const cartModel = require("../models/cartSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const RoleModel = require("../models/roleSchema");

const register = (req, res) => {
  const { firstName, lastName, phoneNumber, country, email, password } =
    req.body;

  RoleModel.findOne({ role: req.body.role }).then((roleObj) => {
    role = roleObj._id;
    const user = new userModel({
      firstName,
      lastName,
      phoneNumber,
      country,
      email,
      password,
      role,
    });

    user
      .save()
      .then((result) => {
        const newCart = new cartModel({
          userId: result._id,
          productId: [],
          quantity: 0,
        });

        newCart
          .save()
          .then((cartResult) => {
            res.status(201).json({
              success: true,
              message: `Account Created Successfully`,
              author: result,
              cart: cartResult,
            });
          })
          .catch((cartError) => {
            res.status(500).json({
              success: false,
              message: `Failed to create cart`,
              err: cartError.message,
            });
          });
      })
      .catch((err) => {
        if (err.keyPattern) {
          return res.status(409).json({
            success: false,
            message: `The email already exists`,
          });
        }

        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  });
};

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  userModel
    .findOne({ email })
    .populate("role", "-_id -__v")
    .then(async (result) => {
      if (!result) {
        return res.status(403).json({
          success: false,
          message: `The email doesn't exist or The password you’ve entered is incorrect`,
        });
      }
      try {
        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
        }
        userId = result._id;
        cartModel
          .findOne({ userId })
          .then((cartObj) => {
            const payload = {
              userId: result._id,
              userName: `${result.firstName} - ${result.lastName}`,
              role: result.role,
            };

            const options = {
              expiresIn: "360m",
            };
            const token = jwt.sign(payload, process.env.SECRET, options);
            res.status(200).json({
              success: true,
              message: "Valid login credentials",
              userCreds: {
                token: token,
                payload: payload,
              },
              cartList: cartObj.products,
              favoriteList: result.fav,
            });
          })
          .catch((error) => {
            throw new Error(error.message);
          });
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const updateUser = (req, res) => {
  const userId = req.params.id;
  const { productId } = req.body;
  console.log("fav", productId);

  userModel
    .findOneAndUpdate(
      { _id: userId },
      { $addToSet: { fav: productId } },
      { new: true }
    )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `User with id ${userId} not found`,
        });
      }
      console.log("result", result.fav);
      res.status(200).json({
        success: true,
        message: "User updated",
        result: result.fav,
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

module.exports = {
  register,
  login,
  updateUser,
};
