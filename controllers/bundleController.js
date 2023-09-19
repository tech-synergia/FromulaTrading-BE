const { StatusCodes } = require("http-status-codes");
const bundleModel = require("../models/bundle");
const { BadRequestError } = require("../errors");

const addBundle = async (req, res) => {
  const { title, description, video, price } = req.body;
  if (!title || !description || !image || !video) {
    throw new BadRequestError("Please complete all fields!");
  }
  const bundle = await bundleModel.create({
    title,
    description,
    video,
    price,
  });

  res.status(StatusCodes.OK).json({ msg: "Bundle has created successfully!" });
};

const deleteBundle = async (req, res) => {
  const { bundleId } = req.params;
  const bundle = await bundleModel.findByIdAndDelete({ _id: bundleId });

  if (!bundle) {
    throw new BadRequestError(`No bundle found with id ${bundleId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "Bundle deleted successfully" });
};

const updateBundle = async (req, res) => {
  const { bundleId } = req.params;
  const bundle = await productModel.findByIdAndUpdate(
    { _id: bundleId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!bundle)
    throw new customError.NotFound(`No product with id: ${bundleId}`);

  res.status(StatusCodes.OK).json({ bundle });
};

module.exports = { addBundle, deleteBundle, updateBundle };
