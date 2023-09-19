const { UnauthroizedError, ForbiddenError } = require("../errors");
const { isTokenValid } = require("../utils/jwt");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthroizedError("Invalid Authentication!");
  }

  const token = authHeader.split(" ")[1];
  try {
    const {
      accessToken: { name, userId, role, email },
    } = isTokenValid(token);
    req.user = {
      name,
      userId,
      role,
      email,
    };
    next();
  } catch (error) {
    throw new UnauthroizedError("Invalid Authentication!");
  }
};

const authorizedPermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new ForbiddenError("You aren't authorize to access this route");
    next();
  };
};

module.exports = { authenticate, authorizedPermission };
