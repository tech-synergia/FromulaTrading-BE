const express = require("express");
const {
  getAllMedia,
  addMedia,
  publicMedia,
  getSingleMedia,
} = require("../controllers/mediaController");
const checkSub = require("../middleware/checkSub");
const {
  authenticate,
  authorizedPermission,
} = require("../middleware/authentication");
const router = express.Router();

router.get("/getAllMedia", authenticate, checkSub, getAllMedia);
router.post("/addMedia", authenticate, authorizedPermission("admin"), addMedia);
router.get("/publicMedia", publicMedia);
router.get("/:id", authenticate, getSingleMedia);

module.exports = router;
