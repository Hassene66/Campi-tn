const mongoose = require("mongoose");
const { post } = require("../routes/api/post");
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
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Veuillez indiquer le propriétaire de cette publication"],
  },
  comments: [{ type: commentSchema }],
  place: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      required: [true, "veuillez ajouter les coordonnées du lieu"],
      index: "2dsphere",
    },
    region: {
      type: String,
      required: true,
    },
  },
  createdAt: { type: Date, default: Date.now },
});
postSchema.index({ title: "text", description: "text" });
module.exports = mongoose.model("Post", postSchema);
