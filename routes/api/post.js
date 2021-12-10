const router = require("express").Router();
const { protect, authorize } = require("../../middleware/auth");
const { check } = require("express-validator");
const { createPost, getPost } = require("../../controllers/post");
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
router.get("/get/post/:id", protect, authorize("user"), getPost);
module.exports = router;
