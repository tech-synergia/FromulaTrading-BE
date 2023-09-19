const { StatusCodes } = require("http-status-codes");
const CustomError = require("./custom");

class UnauthroizedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthroizedError;
