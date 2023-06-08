const authRouter = require("express").Router();
const { body } = require("express-validator");
const { LoginController } = require("../controller/Auth/Login.controller");

authRouter.route("/login").post(
  [
    body("email", "Enter a vaild email").isEmail(),
    body("password", "Password length must be atleast 4").isLength({
      min: 4,
    }),
  ],
  LoginController
);

module.exports = {
  authRouter,
};
