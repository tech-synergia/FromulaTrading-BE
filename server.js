require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const path = require("path");

// const fileUpload = require("express-fileupload");
// const cloudinary = require("cloudinary").v2;
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

const connectDB = require("./db/connect");

// const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const mediaRouter = require("./routes/mediaRoutes");
const stripeController = require("./controllers/stripeController");
const bundleRouter = require("./routes/bundleRoutes");

const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const { authenticate } = require("./middleware/authentication");

const origin = process.env.ORIGIN;

app.use(cors({ origin, credentials: true }));

app.use(express.json());
// app.use(cookieParser(process.env.JWT_SECRET));
// app.use(fileUpload({ useTempFiles: true }));
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/media", mediaRouter);
app.post("/stripe", authenticate, stripeController);
app.use("/bundle", bundleRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening to port ${port}...`);
    });
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.log(error);
  }
};

start();
