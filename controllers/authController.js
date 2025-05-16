//Initializing required 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Send welcome email - await it to catch errors
    await sendEmail(
      savedUser.email,
      "Welcome to Our E-Commerce Platform!",
      `Hi ${savedUser.name},\n\nThanks for registering on our website. Happy shopping!\n\nRegards,\nTeam`
    );

    res.status(201).json({ userId: savedUser._id, email: savedUser.email });
  } catch (err) {
    console.error("Error in registerUser:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("User not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json("Wrong password");

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
