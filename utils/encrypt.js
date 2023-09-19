const crypto = require("crypto");
const fs = require("fs");
const encryptionKey = crypto.randomBytes(32);
const path = require("path");

const encryptVideo = (videoFile, filename) => {
  //   console.log(encryptionKey);
  const videoData = fs.readFileSync(videoFile);

  const iv = crypto.randomBytes(16); // Initialization vector
  const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
  const encryptedVideo = Buffer.concat([
    cipher.update(videoData),
    cipher.final(),
  ]);

  const outputPath = path.join("uploads/videos", filename);
  // Save the encrypted video to a new file
  fs.writeFileSync(outputPath, encryptedVideo);
  return {
    encryptionKey: encryptionKey.toString("hex"),
    outputPath,
  };
};

module.exports = encryptVideo;
