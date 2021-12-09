const mongoose = require("mongoose");

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
    type: Number,
  },
  owner: {
    type: String,
  },
  comments: {
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: false },
    ],
  },
  coordinates: {
    type: [Number],
    required: [true, "veuillez ajouter les coordonnées du lieu"],
  },
});

module.exports = mongoose.model("Post", postSchema);
