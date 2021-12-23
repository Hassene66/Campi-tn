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
  res
    .status(200)
    .json({ success: true, msg: "Publication a été ajoutée avec succès" });
};

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("owner", "name surname  ");
  return res.status(200).json({ success: true, posts: posts });
};

exports.getPost = async (req, res, next) => {
  if (!req.params.id) {
    return next(
      new ErrorResponse("Veuillez fournir l'ID du publication ", 400)
    );
  }
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(
        new ErrorResponse("Publication non trouvé avec l’id fourni", 404)
      );
    }
    return res.status(200).json({ success: true, post: post });
  } else {
    return next(new ErrorResponse("Veuillez fournir une ID valide", 500));
  }
};

exports.likePost = async (req, res, next) => {
  if (!req.body.userID) {
    return next(
      new ErrorResponse("erreur: impossible d’exécuter l’action", 400)
    );
  }
  if (!req.params.id) {
    return next(
      new ErrorResponse("Veuillez fournir l'ID du publication ", 400)
    );
  }
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      [
        {
          $set: {
            likes: {
              $cond: {
                if: {
                  $in: [mongoose.Types.ObjectId(req.body.userID), "$likes"],
                },
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

exports.unlikePost = async (req, res, next) => {
  if (!req.body.userID) {
    return next(
      new ErrorResponse("erreur: impossible d’exécuter l’action", 400)
    );
  }
  if (!req.params.id) {
    return next(
      new ErrorResponse("Veuillez fournir l'ID du publication ", 400)
    );
  }
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },

      { $pull: { likes: req.body.userID } },

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

exports.removePost = async (req, res, next) => {
  if (!req.params.id) {
    return next(
      new ErrorResponse("Veuillez fournir l'ID du publication ", 400)
    );
  }
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Post.findByIdAndDelete(req.params.id, function (err, deletedPost) {
      if (err) {
        return next(
          new ErrorResponse(
            "La publication n’a pas pu être supprimé en raison d’une erreur de serveur",
            500
          )
        );
      }
      if (!deletedPost) {
        return next(
          new ErrorResponse("Publication non trouvé avec l’id fourni", 404)
        );
      }

      return res.status(400).json({
        success: true,
        msg: "publication a été supprimé avec succès",
      });
    });
  } else {
    return next(new ErrorResponse("Veuillez fournir une ID valide", 500));
  }
};
