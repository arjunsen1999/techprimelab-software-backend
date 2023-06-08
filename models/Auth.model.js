const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const AuthModel = mongoose.model("auth", authSchema);
module.exports = {
  AuthModel,
};
