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
} = require("../../controllers/post");
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
router.get("/get/posts", protect, authorize("user"), getAllPosts);
router.delete("/delete/post/:id", protect, authorize("user"), removePost);
router.get("/get/popular/posts", protect, authorize("user"), getPolularPosts);
module.exports = router;
