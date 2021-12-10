const router = require("express").Router();
const { protect, authorize } = require("../../middleware/auth");
const { addComment, deleteComment } = require("../../controllers/comment");
const { check } = require("express-validator");
router.post(
  "/add/comment/:id",
  protect,
  authorize("user"),
  [
    check("owner", "veuillez fournir un l'ID d’utilisateur valide")
      .isMongoId()
      .notEmpty(),
    check("text", "Commentaire vide n’est pas autorisé").isString().notEmpty(),
  ],
  addComment
);
router.delete("/delete/comment/:id", protect, authorize("user"), deleteComment);
module.exports = router;
