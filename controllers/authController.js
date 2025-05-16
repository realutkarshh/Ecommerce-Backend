//Initializing required 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    //Hashing the password(entered by the user) using bcrypt 
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    //Creating a new user in the database
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    //Save the user in the database
    const savedUser = await newUser.save();

    // Send welcome email to the user- await it to catch errors
    await sendEmail(
      savedUser.email,
      "Welcome to Our E-Commerce Platform!",
      `Hi ${savedUser.name},\n\nThanks for registering on our website. Happy shopping!\n\nRegards,\nTeam`
    );

    //Give the Response status when the user is created successfully
    res.status(201).json({ userId: savedUser._id, email: savedUser.email });
  } catch (err) {

    //Error Response when there is an issue in creating the user
    console.error("Error in registerUser:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {

    //Check if the user exists in the database or not
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("User does not exists"); //Return if user does not exits

    //Check if the password is correct or not
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json("Wrong password"); //Return if password is incorrect


    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    //Response status when the login is successful.
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

  } 
  //If the login is not success then error Response
  catch (err) {
    res.status(500).json(err);
  }
};
