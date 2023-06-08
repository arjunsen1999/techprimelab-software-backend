const { AuthModel } = require("../../models/Auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const saltRounds = 6;

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // If any error exists then throw Error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .send({ status: "error", message: errors.array()[0].msg });
    }

    // Check if user with the provided email exists
    const user = await AuthModel.findOne({ email });
    if (!user) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // create a user
      const user = await AuthModel.create({ email, password: hashedPassword });

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

      // Create response
      const response = {
        status: "success",
        message: "Login successful",
        token,
      };

      return res.status(200).json(response);
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    // Create response
    const response = {
      status: "success",
      message: "Login successful",
      token,
    };

    return res.status(200).json(response);
  } catch (error) {
    // Create error response
    const error_response = {
      status: "fail",
      message: "An error occurred",
    };
    console.log(error);
    return res.status(500).json(error_response);
  }
};

module.exports = {
  LoginController,
};
