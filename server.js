require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
// const path = require("path");
const bodyParser = require("body-parser");

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

const origin = [process.env.ORIGIN1, process.env.ORIGIN2];

app.use(cors({ origin, credentials: true }));

app.use(express.json());
app.use(bodyParser.json({ limit: "10gb" }));
app.use(bodyParser.urlencoded({ limit: "10gb", extended: true }));
app.use("/api/uploads", express.static("uploads"));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/media", mediaRouter);
app.post("/api/stripe", authenticate, stripeController);
app.use("/api/bundle", bundleRouter);

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
