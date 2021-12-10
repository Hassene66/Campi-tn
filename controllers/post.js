const { validationResult } = require("express-validator");
const Post = require("../models/Post");

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  await Post.create({ ...req.body });
  res.status(200).json({ success: true, msg: "Post was successfully added" });
};
exports.getPost = async (req, res) => {
  const post = await Post.findById({ _id: req.params.id })
    .exec()
    .populate("likes");
  res.status(200).json({ success: true, res: post });
};
