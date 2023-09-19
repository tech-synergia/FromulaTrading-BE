const { BadRequestError } = require("../errors");
const userModel = require("../models/user");

const checkSub = async (req, res, next) => {
  const user = await userModel.findOne({ _id: req.user.userId });

  if (!user) {
    throw new BadRequestError("No user found!");
  }
  if (!user.subscription[0].subscribed) {
    throw new BadRequestError("User is not subscribed!");
  }

  if (!(user.subscription[0].expiration >= Date.now())) {
    throw new BadRequestError("Subcription has expired!");
  }
  next();
};

module.exports = checkSub;
