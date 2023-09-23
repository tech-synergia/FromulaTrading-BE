const express = require("express");
const {
  login,
  logout,
  register,
  accessTokenVerify,
  existingUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
// const checkSub = require("../middleware/checkSub");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/token", accessTokenVerify);
router.post("/existingUser", existingUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
