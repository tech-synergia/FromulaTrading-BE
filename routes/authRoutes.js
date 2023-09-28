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
const {
  authenticate,
  authorizedPermission,
} = require("../middleware/authentication");
// const checkSub = require("../middleware/checkSub");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/token", accessTokenVerify);
router.post(
  "/existingUser",
  authenticate,
  authorizedPermission("admin"),
  existingUser
);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
