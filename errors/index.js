const BadRequestError = require("./badRequest");
const ForbiddenError = require("./forbidden");
const NotFoundError = require("./notFound");
const UnauthroizedError = require("./unauthorized");

module.exports = {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthroizedError,
};
