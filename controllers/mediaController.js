const { StatusCodes } = require("http-status-codes");
const mediaModel = require("../models/media");
const { BadRequestError } = require("../errors");

const getAllMedia = async (req, res) => {
  const media = await mediaModel.find({}).select("-_id");
  res.status(StatusCodes.OK).json({ media });
};

const getSingleMedia = async (req, res) => {
  const media = await mediaModel.findById(req.params);
  if (!media) {
    throw BadRequestError(`No media found with id: ${req.params}`);
  }
};

const publicMedia = async (req, res) => {
  const media = await mediaModel
    .find({})
    .select({ title: 1, image: 1, description: 1, _id: 0 });

  res.status(StatusCodes.OK).json({ media });
};

const addMedia = async (req, res) => {
  const { title, description, image, video } = req.body;
  if (!title || !description || !image || !video) {
    throw new BadRequestError("Please complete all fields!");
  }
  const media = await mediaModel.create({
    title,
    description,
    image,
    video,
  });

  res.status(StatusCodes.OK).json({ media });
};

module.exports = { getAllMedia, addMedia, publicMedia, getSingleMedia };
