const authRouter = require("express").Router();
const { body } = require("express-validator");
const { LoginController } = require("../controller/Auth/Login.controller");

authRouter.route("/login").post(
  [
    body("email", "Enter a vaild email").isEmail()
  ],
  LoginController
);

module.exports = {
  authRouter,
};
