const { Schema, model } = require("mongoose");

const mediaSchema = new Schema({
  title: {
    type: String,
  },

  description: {
    type: String,
  },

  image: {
    type: String,
  },

  video: {
    type: String,
  },
});

module.exports = model("media", mediaSchema);
