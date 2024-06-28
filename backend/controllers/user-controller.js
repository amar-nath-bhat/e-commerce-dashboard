const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const signup = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.name) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: hashPassword,
    });
    await user.save();
    return res
      .status(201)
      .json({ success: true, message: "Sign Up Successfull!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    if (!user.password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter Password." });
    }

    let match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }

    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      success: true,
      user: user,
      token: token,
      message: "Login Successful!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { signup, login };
