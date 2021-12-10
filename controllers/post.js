const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Post = require("../models/Post");
const ErrorResponse = require("../utils/errorResponse");

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  await Post.create({ ...req.body });
  res.status(200).json({ success: true, msg: "Post was successfully added" });
};
exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("owner", "name surname  ");
  res.status(200).json({ success: true, posts: posts });
};
exports.likePost = async (req, res) => {
  if (!req.body.userID) {
    return ErrorResponse("erreur: impossible d’exécuter l’action", 400);
  }
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id },
    [
      {
        $set: {
          likes: {
            $cond: {
              if: { $in: [mongoose.Types.ObjectId(req.body.userID), "$likes"] },
              then: "$likes",
              else: {
                $concatArrays: [
                  "$likes",
                  [new mongoose.Types.ObjectId(req.body.userID)],
                ],
              },
            },
          },
        },
      },
    ],
    { new: true },
    null
  );
  res.status(200).json({ success: true, post: post });
};
exports.unlikePost = async (req, res) => {
  if (!req.body.userID) {
    return ErrorResponse("erreur: impossible d’exécuter l’action", 400);
  }
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id },

    { $pull: { likes: req.body.userID } },

    { new: true },
    null
  );
  res.status(200).json({ success: true, post: post });
};
