const mongoose = require("mongoose");
const commentSchema = require("./Comment");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "veuillez entrer le titre"],
    trim: true,
    maxlength: [100, "le titre ne peut pas dépasser 100 caractères"],
  },
  description: {
    type: String,
    required: [true, "veuillez entrer la description"],
    maxlength: [300, "le prénom ne peut pas dépasser 300 caractères"],
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
    ],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Veuillez indiquer le propriétaire de ce poste"],
  },
  comments: [{ type: commentSchema }],
  coordinates: {
    type: [Number],
    required: [true, "veuillez ajouter les coordonnées du lieu"],
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
