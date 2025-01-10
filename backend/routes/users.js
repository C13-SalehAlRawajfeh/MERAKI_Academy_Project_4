const express = require("express");
const { register, login, updateUser } = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.put("/updateUser/:id", updateUser);

module.exports = usersRouter;
