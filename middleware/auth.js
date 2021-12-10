const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
//protect routes
exports.protect = async (req, res, next) => {
  let token;

  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  // } else
  if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return next(
      new ErrorResponse(
        "Vous n'êtes pas autorisé(e) à accéder à cette page",
        401
      )
    );
  }
  try {
    //   verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(
      new ErrorResponse(
        "Vous n'êtes pas autorisé(e) à accéder à cette page",
        401
      )
    );
  }
};
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          "Vous n'êtes pas autorisé(e) à faire cette action",
          403
        )
      );
    }
    next();
  };
};
