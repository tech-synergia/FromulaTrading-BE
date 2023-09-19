const express = require("express");
const router = express.Router();
const {
  addBundle,
  updateBundle,
  deleteBundle,
} = require("../controllers/bundleController");
const {
  authenticate,
  authorizedPermission,
} = require("../middleware/authentication");

router.post(
  "/addBundle",
  authenticate,
  authorizedPermission("admin"),
  addBundle
);
router.patch(
  "/update/:bundleId",
  authenticate,
  authorizedPermission("admin"),
  updateBundle
);
router.delete(
  "/delete/:bundleId",
  authenticate,
  authorizedPermission("admin"),
  deleteBundle
);

module.exports = router;
