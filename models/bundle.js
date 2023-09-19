const { Schema, model } = require("mongoose");

const bundleSchema = new Schema({
  title: {
    type: String,
  },

  description: {
    type: String,
  },

  //   image: {
  //     type: String,
  //   },

  video: {
    type: String,
  },

  price: {
    type: String,
  },
});

module.exports = model("bundle", bundleSchema);
