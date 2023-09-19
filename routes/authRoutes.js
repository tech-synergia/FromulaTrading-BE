const express = require("express");
const {
  login,
  logout,
  register,
  accessTokenVerify,
} = require("../controllers/authController");
const checkSub = require("../middleware/checkSub");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/token", accessTokenVerify);

module.exports = router;
