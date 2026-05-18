const express = require("express");

const router = express.Router();

const {
  signupUser,
  loginUser,
  loginAdmin
} = require("../controllers/authController");


// USER SIGNUP
router.post("/signup", signupUser);


// USER LOGIN
router.post("/login", loginUser);


// ADMIN LOGIN
router.post("/admin/login", loginAdmin);


module.exports = router;