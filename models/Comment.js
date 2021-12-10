const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "veuillez entrer l'identificateur du publication"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Veuillez indiquer le propriétaire de ce commentaire"],
  },
  text: {
    type: String,
    required: [true, "veuillez entrer la description"],
    maxlength: [300, "le message ne peut pas dépasser 300 caractères"],
  },
  reply: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    required: false,
  },
});
module.exports = mongoose.model("Comment", commentSchema);
