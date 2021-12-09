const { async } = require("rxjs");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
exports.register = async (req, res, next) => {
  const { name, surname, email, password } = req.body;
  if (!name || !surname || !email || !password) {
    return next(
      new ErrorResponse("veuillez fournir tous les renseignements requis", 400)
    );
  }
  const ExistingUser = await User.findOne({ email });
  if (ExistingUser) {
    return next(
      new ErrorResponse(
        "utilisateur existe déjà s’il vous plaît rediriger vers la page de connexion",
        401
      )
    );
  }
  const user = await User.create({
    name,
    surname,
    email,
    password,
  });
  sendTokenResponse(user, 200, res);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorResponse("veuillez fournir l'email et le mot de passe", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(
      new ErrorResponse(
        "Les informations de connexion fournies sont invalides",
        401
      )
    );
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(
      new ErrorResponse(
        "Les informations de connexion fournies sont invalides",
        401
      )
    );
  }

  sendTokenResponse(user, 200, res);
};

exports.logout = async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 1000),
    http_only: true,
  });
  res.status(200).json({ success: true });
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    http_only: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

// @desc forget password
// @route Post /api/v1/auth/forgetpassword
// @access public
exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse("Pas d'utilisateur avec cet email", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    data: user,
  });
};
