const router = require("express").Router();
const { protect, authorize } = require("../../middleware/auth");
const { addComment } = require("../../controllers/comment");
router.post("/add/comment", protect, authorize("user"), addComment);
module.exports = router;
