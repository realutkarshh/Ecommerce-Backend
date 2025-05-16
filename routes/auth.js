const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

//Authentication routes

//To Register a user | Method:POST /api/auth/register with body {name, email and password}
router.post("/register", authController.registerUser);

// Login | Method:POST /api/auth/login with body {email and password}
router.post("/login", authController.loginUser);

module.exports = router;
