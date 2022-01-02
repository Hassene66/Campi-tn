const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const Post = require("../models/Post");
const upload = require("../middleware/fileUpload");
const Grid = require("gridfs-stream");
const cleanCache = require("../middleware/cleanCache");
const ErrorResponse = require("../utils/errorResponse");

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  await Post.create({
    ...req.body,
    owner: mongoose.Types.ObjectId(req.user._id),
  });
  res
    .status(200)
    .json({ success: true, msg: "Publication a été ajoutée avec succès" });
};

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

exports.getAllPosts = async (req, res) => {
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    const posts = await Post.find({
      $text: { $search: regex },
    })
      .populate("owner", "name surname  ")
      .sort("-createdAt");
    return res.status(200).json({ success: true, posts: posts });
  } else {
    const posts = await Post.find()
      .populate("owner", "name surname  ")
      .sort("-createdAt");
    return res.status(200).json({ success: true, posts: posts });
  }
};

exports.getPost = async (req, res, next) => {
  if (!req.params.id) {
    return next(
      new ErrorResponse("Veuillez fournir l'ID du publication ", 400)
    );
  }
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const post = await Post.findById(req.params.id).cache({
      key: req.user.id,
    });

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
  if (!req.params.id) {
    return next(
      new ErrorResponse("Veuillez fournir l'ID du publication ", 400)
    );
  }
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Post.findOneAndUpdate(
      { _id: req.params.id },
      [
        {
          $set: {
            likes: {
              $cond: {
                if: {
                  $in: [mongoose.Types.ObjectId(req.user._id), ["$owner"]],
                },
                then: "$likes",
                else: {
                  $cond: {
                    if: {
                      $in: [mongoose.Types.ObjectId(req.user._id), "$likes"],
                    },
                    then: "$likes",
                    else: {
                      $concatArrays: [
                        "$likes",
                        [new mongoose.Types.ObjectId(req.user._id)],
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      ],
      { new: true },
      (err, post) => {
        if (err) {
          return next(
            new ErrorResponse(
              "La publication n’a pas pu être supprimé en raison d’une erreur de serveur",
              500
            )
          );
        }
        if (!post) {
          return next(
            new ErrorResponse("Publication non trouvé avec l’id fourni", 404)
          );
        }
        if (post.owner == req.user.id) {
          return next(
            new ErrorResponse(
              "vous ne pouvez pas aimer votre propre publication",
              403
            )
          );
        }
        res.status(200).json({ success: true, post: post });
      }
    );
  } else {
    return next(new ErrorResponse("Veuillez fournir une ID valide", 500));
  }
};

exports.unlikePost = async (req, res, next) => {
  if (!req.params.id) {
    return next(
      new ErrorResponse("Veuillez fournir l'ID du publication ", 400)
    );
  }
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },

      { $pull: { likes: req.user._id } },

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
    Post.findOneAndDelete(
      { _id: req.params.id, owner: req.user._id },
      function (err, PostTodelete) {
        if (err) {
          return next(
            new ErrorResponse(
              "La publication n’a pas pu être supprimé en raison d’une erreur de serveur",
              500
            )
          );
        }
        if (!PostTodelete) {
          return next(
            new ErrorResponse(
              "Vous n’êtes pas autorisé à faire cette action",
              403
            )
          );
        }
        return res.status(400).json({
          success: true,
          msg: "Publication a été supprimé avec succès",
        });
      }
    );
  } else {
    return next(new ErrorResponse("Veuillez fournir une ID valide", 500));
  }
};

exports.getPolularPosts = async (req, res, next) => {
  Post.aggregate([
    {
      $addFields: {
        numberLikes: {
          $cond: {
            if: { $isArray: "$likes" },
            then: { $size: "$likes" },
            else: 0,
          },
        },
      },
    },
    {
      $sort: {
        numberLikes: -1,
      },
    },
    { $limit: 3 },
  ])
    .exec()
    .then((x) => res.status(200).send(x));
};

// @Desc Get Posts within a radius by kilometers
// @Route GET /api/get/allposts/:lng/:lat/:distance
// @access Private

exports.getPostsByRadius = async (req, res, next) => {
  const { lng, lat, distance } = req.params;
  const radius = distance / 6378.1;
  const posts = await Post.find({
    place: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },
  });
  return res.status(200).json({
    success: true,
    count: posts.length,
    data: posts,
  });
};
const conn = mongoose.createConnection(process.env.MONGO_URI);
let gfs;
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  console.log("Connection Successful");
});

exports.UploadPostImage = (req, res, err) => {
  if (res) {
    res.json({ message: "Image envoyé avec succès" });
  } else {
    if (err) {
      res.json({ message: "Échec d'envoi" });
    }
  }
};

exports.getImagesData = (req, res) => {
  gfs.find({ "metadata.PostID": req.body.PostID }).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        message: "Could not find files",
      });
    } else {
      return res.json(files);
    }
  });
};

exports.getImages = (req, res) => {
  gfs.find({ "metadata.PostID": req.params.id }).toArray((err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    file = file[0];
    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      const downloadStream = gfs.openDownloadStream(file._id);
      downloadStream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  });
};
exports.deletePostImage = async (req, res) => {
  gfs.delete(mongoose.Types.ObjectId(req.params.id), (err) => {
    if (err) {
      return res.status(404).json({ err: err });
    }
    return res.json({ message: "file was deleted" });
  });
};
