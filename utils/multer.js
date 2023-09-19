const multer = require("multer");
const path = require("path");
const fs = require("fs");

const multerUpload = (dest) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      cb(null, `${dest}`);
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const upload = multer({ storage });
  return upload;
};

module.exports = multerUpload;
