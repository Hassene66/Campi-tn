const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "veuillez entrer votre nom"],
    trim: true,
    maxlength: [50, "le nom ne peut pas dépasser 50 caractères"],
  },
  surname: {
    type: String,
    required: [true, "veuillez entrer votre Prénom"],
    trim: true,
    maxlength: [50, "le prénom ne peut pas dépasser 50 caractères"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, "l'email doit être unique"],
    required: "l'adresse email est obligatoire",
    validate: [isEmail, "veuillez saisir une adresse e-mail valide"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "veuillez entrer le mot de passe"],
    minlength: [6, "le mot de passe doit comporter au moins 6 caractères"],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  resetEmailToken: String,
  resetEmailExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.matchEmail = async function (enteredEmail) {
  return this.email === enteredEmail;
};

// generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.methods.getResetEmailToken = function () {
  const resetToken = crypto.randomBytes(21).toString("hex");
  this.resetEmailToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetEmailExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
