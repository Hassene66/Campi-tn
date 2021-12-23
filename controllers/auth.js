const { async } = require("rxjs");
const crypto = require("crypto");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");

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

// @desc Reset password
// @route PUT /api/resetpassword/:resettoken
// @acces Public
exports.resetPassword = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  // get hashed password
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("Token invalide", 400));
    // set new password
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPassworExpire = undefined;
  await user.save();
  sendTokenResponse(user, 200, res);
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
// @route Post /api/forgetpassword
// @access public
exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse("Pas d'utilisateur avec cet email", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/resetpassword/${resetToken}`;
  const message = `vous recevez cet e-mail car vous avez demandé la réinitialisation d'un mot de passe, veuillez faire une requête PUT à : \n\n ${resetURL}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "réinitialiser le mot de passe",
      message,
    });
    res.status(200).json({
      success: true,
      data: "Un Email de réinitialisation du mot de passe a été envoyé avec succès ",
    });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("Email n'a pas pu être envoyé", 500));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
};

// @update user details
// @route put /api/updatedetails
// @access private

exports.updateDetails = async (req, res, next) => {
  const fieldtoupdate = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, fieldtoupdate, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: user,
  });
};

// @update Update password
// @route put /api/updatepassword
// @access private

exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.matchPassword(req.body.currentPassword)))
    return next(new ErrorResponse("le mot de passe est incorrect", 401));

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
};
