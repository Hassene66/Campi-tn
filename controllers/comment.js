const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  await Comment.create({ ...req.body });
  res
    .status(200)
    .json({ success: true, msg: "Comment was successfully added" });
};
exports.getComment = async (req, res) => {
  const comment = await Comment.findById({ _id: req.params.id });
  res.status(200).json({ success: true, res: comment });
};
