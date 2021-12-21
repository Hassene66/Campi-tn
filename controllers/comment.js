const Post = require("../models/Post");
const ErrorResponse = require("../utils/errorResponse");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

exports.addComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(res.status(400).json({ errors: errors.array() }));
  }
  if (!req.params.id) {
    return next(
      new ErrorResponse("Veuillez fournir l'ID du publication ", 400)
    );
  }
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
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
    if (!post) {
      return next(
        new ErrorResponse("Publication non trouvé avec l’id fourni", 404)
      );
    }
    res.status(200).json({ success: true, post: post });
  } else {
    return next(new ErrorResponse("Veuillez fournir une ID valide", 500));
  }
};

exports.deleteComment = async (req, res, next) => {
  if (!req.body.CommentID) {
    return next(
      new ErrorResponse("Veuillez fournir l'ID du commentaire ", 400)
    );
  }
  if (!req.params.id) {
    return next(
      new ErrorResponse("Veuillez fournir l'ID du publication ", 400)
    );
  }
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const post = await Post.findByIdAndUpdate(
      { _id: req.params.id },
      { $pull: { comments: { _id: req.body.CommentID } } },
      { new: true },
      null
    );
    if (!post) {
      return next(
        new ErrorResponse("Publication non trouvé avec l’id fourni", 404)
      );
    }
    res.status(200).json({ success: true, post: post });
  } else {
    return next(new ErrorResponse("Veuillez fournir une ID valide", 500));
  }
};
