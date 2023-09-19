const { BadRequestError } = require("../errors");
const userModel = require("../models/user");
const { StatusCodes } = require("http-status-codes");
// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");

const getAllUsers = async (req, res) => {
  const users = await userModel
    .find({ role: { $ne: "admin" } })
    .select("-password");
  res.status(StatusCodes.OK).json({ users, count: users.length });
};

const getSingleUser = async (req, res) => {
  const { userId } = req.params;
  const user = await userModel.findOne({ _id: userId }).select("-password");
  if (!user) {
    throw new BadRequestError(`No user found with userId ${userId}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const subscribe = async (req, res) => {
  const user = await userModel.findOne({ _id: req.user.userId });
  if (!user) {
    throw new BadRequestError("No user found!");
  }
  const twoMonths = 1000 * 60 * 60 * 24 * 60;
  user.subscription[0].subscribed = true;
  user.subscription[0].expiration = new Date(Date.now() + twoMonths);
  await user.save();
  res.status(StatusCodes.OK).json({ user });
};

// const uploadImage = async (req, res) => {
//   const result = await cloudinary.uploader.upload(
//     req.files.image.tempFilePath,
//     { use_filename: true, resource_type: "image", folder: "FBT-Images" }
//   );

//   fs.unlinkSync(req.files.image.tempFilePath);

//   return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
// };

// const uploadVideo = async (req, res) => {
//   const result = await cloudinary.uploader.upload(
//     req.files.video.tempFilePath,
//     { use_filename: true, resource_type: "video", folder: "FBT-Videos" }
//   );

//   fs.unlinkSync(req.files.video.tempFilePath);

//   return res.status(StatusCodes.OK).json({ video: { src: result.secure_url } });
// };

const uploadImage = async (req, res) => {
  const { path } = req.file;
  const url = `http://localhost:5000/${path}`;
  res.status(StatusCodes.OK).json({ url });
};

const uploadVideo = async (req, res) => {
  const { path } = req.file;
  const url = `http://localhost:5000/${path}`;
  res.status(StatusCodes.OK).json({ url });
};

module.exports = {
  getAllUsers,
  uploadImage,
  uploadVideo,
  subscribe,
  getSingleUser,
};
