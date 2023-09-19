const express = require("express");
const {
  login,
  logout,
  register,
  accessTokenVerify,
  existingUser,
} = require("../controllers/authController");
const checkSub = require("../middleware/checkSub");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/token", accessTokenVerify);
router.post("/existingUser", existingUser);

module.exports = router;
