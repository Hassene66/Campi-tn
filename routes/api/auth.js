const router = require("express").Router();
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  updateEmail,
  resetEmail,
} = require("../../controllers/auth");

const { protect } = require("../../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.put("/updatedetails", protect, updateDetails);
router.post("/updateemail", protect, updateEmail);
router.put("/updatepassword", protect, updatePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.put("/resetemail/:resettoken", resetEmail);
module.exports = router;
