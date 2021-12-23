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
} = require("../../controllers/post");
router.post(
  "/new/post",
  protect,
  authorize("user"),
  [
    check("title", "veuillez entrer le titre").not().isEmpty(),
    check(
      "description",
      "la description doit comporter au moins 10 caractères"
    ).isLength({ min: 6 }),
    check("coordinates", "veuillez sélectionnez le lieu de camping")
      .isArray()
      .notEmpty(),
  ],
  createPost
);
router.put("/like/post/:id", protect, authorize("user"), likePost);
router.put("/unlike/post/:id", protect, authorize("user"), unlikePost);
router.get("/get/post/:id", protect, authorize("user"), getPost);
router.get("/get/posts", protect, authorize("user"), getAllPosts);
router.delete("/delete/post/:id", protect, authorize("user"), removePost);
module.exports = router;
