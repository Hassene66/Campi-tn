const Post = require("../models/Post");
const ErrorResponse = require("../utils/errorResponse");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
exports.addComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    if (!req.params.id) {
      return ErrorResponse("Veuillez fournir l'ID du post ", 400);
    }
  }
  const { text, owner } = req.body;

  const post = await Post.findByIdAndUpdate(
    { _id: req.params.id },
    [
      {
        $set: {
          comments: {
            $concatArrays: [
              "$comments",
              [
                {
                  _id: mongoose.Types.ObjectId(owner),
                  owner: mongoose.Types.ObjectId(owner),
                  text,
                },
              ],
            ],
          },
        },
      },
    ],
    { new: true },
    null
  );
  res.status(200).json({ success: true, post: post });
};
exports.deleteComment = async (req, res) => {
  if (!req.body.CommentID) {
    return ErrorResponse("Veuillez fournir l'ID du commentaire ", 400);
  }
  if (!req.params.id) {
    return ErrorResponse("Veuillez fournir l'ID du post ", 400);
  }
  const post = await Post.findByIdAndUpdate(
    { _id: req.params.id },
    { $pull: { comments: { _id: req.body.CommentID } } },
    { new: true },
    null
  );
  res.status(200).json({ success: true, post: post });
};
// exports.getComment = async (req, res) => {
//   const comment = await Comment.findById({ _id: req.params.id }).populate({
//     path: "postID",
//     populate: {
//       path: "likes",
//       model: "User",
//     },
//   });
//   res.status(200).json({ success: true, res: comment });
// };
