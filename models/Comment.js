const mongoose = require("mongoose");

exports.commentSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Veuillez indiquer le propriétaire de ce commentaire"],
  },
  text: {
    type: String,
    required: [true, "Veuillez entrer le commentaire"],
    maxlength: [300, "Commentaire ne peut pas dépasser 300 caractères"],
  },
  createdAt: { type: Date, default: Date.now },
});
