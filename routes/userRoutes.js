const express = require("express");
const router = express.Router();
const {
  authenticate,
  authorizedPermission,
} = require("../middleware/authentication");
const multerUpload = require("../utils/multer");

const {
  getAllUsers,
  getSingleUser,
  uploadImage,
  uploadVideo,
  subscribe,
} = require("../controllers/userController");

router.get(
  "/getAllUsers",
  authenticate,
  authorizedPermission("admin"),
  getAllUsers
);
router.post(
  "/uploadImage",
  authenticate,
  multerUpload("uploads/images").single("image"),
  uploadImage
);

router.post(
  "/uploadVideo",
  authenticate,
  multerUpload("uploads/video").single("video"),
  uploadVideo
);

router.patch("/subscribe", authenticate, subscribe);

router.get("/:userId", authenticate, getSingleUser);

module.exports = router;
