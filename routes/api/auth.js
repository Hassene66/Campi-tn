const router = require("express").Router();
const {
  register,
  login,
  logout,
  forgotPassword,
} = require("../../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgotpassword", forgotPassword);
module.exports = router;
