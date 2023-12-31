const { BadRequestError, UnauthroizedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { createUserToken, attachCookiesToResponse } = require("../utils");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user");
const tokenModel = require("../models/token");

const register = async (req, res) => {
  const { name, email, password, state, phone } = req.body;

  if (!name || !email || !password || !phone || !state)
    throw new BadRequestError("Please fill all the fields!");

  const emailAlreadyExists = await userModel.findOne({ email });

  if (emailAlreadyExists) throw new BadRequestError("Email already exists!");

  await userModel.create({
    name,
    email,
    password,
    state,
    phone,
  });

  res.status(StatusCodes.CREATED).json({
    msg: "Successfully Registered. Please Sign-in!",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError("Please provide email and password!");

  const user = await userModel.findOne({ email });
  if (!user) throw new UnauthroizedError("Invalid Credentials!");

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) throw new UnauthroizedError("Invalid Credentials");

  const accessToken = createUserToken(user);
  const token = attachCookiesToResponse({ accessToken });

  res.status(StatusCodes.OK).json({ user: accessToken, accessToken: token });
};

const logout = async (req, res) => {
  await tokenModel.findOneAndDelete({ user: req.user.userId });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "Success! User logged out!" });
};

const accessTokenVerify = async (req, res) => {
  const { accessToken } = req.body;
  if (!accessToken)
    throw new UnauthroizedError("Invalid Authentication - Please log in!");

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, data) => {
    if (err)
      throw new UnauthroizedError("Session expired! Please log in again!");

    res.status(200).json({
      msg: "User authenticated!",
      data: {
        userId: data.accessToken.userId,
        name: data.accessToken.name,
        role: data.accessToken.role,
      },
    });
  });
};

module.exports = { register, login, logout, accessTokenVerify };
