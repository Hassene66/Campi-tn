const router = require("express").Router();
const { protect, authorize } = require("../../middleware/auth");
const { addComment, deleteComment } = require("../../controllers/comment");
const { check } = require("express-validator");
const cleanCache = require("../../middleware/cleanCache");
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
  cleanCache,
  addComment
);
router.delete(
  "/delete/comment/:id",
  protect,
  authorize("user"),
  cleanCache,
  deleteComment
);
module.exports = router;
