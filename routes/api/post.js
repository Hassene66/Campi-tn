const router = require("express").Router();
const { protect, authorize } = require("../../middleware/auth");
const { check } = require("express-validator");
const {
  createPost,
  likePost,
  unlikePost,
  getAllPosts,
  getPost,
  removePost,
  getPolularPosts,
  getPostsByRadius,
  UploadPostImage,
  getImagesData,
  getImages,
  deletePostImage,
  updatePost,
} = require("../../controllers/post");
const { upload } = require("../../middleware/fileUpload");
router.post(
  "/new/post",
  protect,
  authorize("user"),
  [
    check("title", "Veuillez entrer le titre").not().isEmpty(),
    check(
      "description",
      "La description doit comporter au moins 10 caractères"
    ).isLength({ min: 6 }),
    check("place.coordinates", "Veuillez sélectionnez le lieu de camping")
      .isArray()
      .notEmpty(),
  ],
  createPost
);
router.put("/like/post/:id", protect, authorize("user"), likePost);
router.put("/unlike/post/:id", protect, authorize("user"), unlikePost);
router.get(
  "/get/allposts/:lng/:lat/:distance",
  protect,
  authorize("user"),
  getPostsByRadius
);
router.get("/get/post/:id", protect, authorize("user"), getPost);
router.put("/update/post/:id", protect, authorize("user"), updatePost);
router.get("/get/posts", protect, authorize("user"), getAllPosts);
router.delete("/delete/post/:id", protect, authorize("user"), removePost);
router.get("/get/popular/posts", protect, authorize("user"), getPolularPosts);
router.post(
  "/upload/post/image",
  upload("uploads").single("img"),
  UploadPostImage
);
router.get("/get/image/data", getImagesData);
router.get("/get/post/image/:id", getImages);
router.delete(
  "/remove/post/image/:id",
  protect,
  authorize("user"),
  deletePostImage
);
module.exports = router;
