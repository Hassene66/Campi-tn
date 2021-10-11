const User = require("../models/User");
const user = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
exports.register = async (req, res, next) => {
  const { nom, prénom, email, motdepasse } = req.body;
  const user = await User.create({
    nom,
    prénom,
    email,
    motdepasse,
  });
  sendTokenResponse(user, 200, res);
};

exports.login = async (req, res, next) => {
  const { email, motdepasse } = req.body;
  if (!email || !motdepasse) {
    return next(
      new ErrorResponse("veuillez fournir l'email et le mot de passe", 400)
    );
  }
  const user = await User.findOne({ email }).select("+motdepasse");
  if (!user) {
    return next(
      new ErrorResponse(
        "Les informations de connexion fournies ne sont pas valides",
        401
      )
    );
  }
  const isMatch = await user.matchPassword(motdepasse);
  if (!isMatch) {
    return next(
      new ErrorResponse(
        "Les informations de connexion fournies ne sont pas valides",
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
