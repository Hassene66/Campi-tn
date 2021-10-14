const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, "veuillez entrer votre nom"],
    trim: true,
    maxlength: [50, "le nom ne peut pas dépasser 50 caractères"],
  },
  prénom: {
    type: String,
    required: [true, "veuillez entrer votre Prénom"],
    trim: true,
    maxlength: [50, "le prénom ne peut pas dépasser 50 caractères"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, "email need to be unique"],
    required: "l'adresse email est obligatoire",
    validate: [isEmail, "veuillez saisir une adresse e-mail valide"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  motdepasse: {
    type: String,
    required: [true, "veuillez entrer le mot de passe"],
    minlength: [6, "le mot de passe doit comporter au moins 6 caractères"],
    select: false,
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.motdepasse = await bcrypt.hash(this.motdepasse, salt);
});
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.motdepasse);
};

module.exports = mongoose.model("User", userSchema);
