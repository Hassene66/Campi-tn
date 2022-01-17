const router = require("express").Router();
const cleanCache = require("../../middleware/cleanCache");
const rateLimit = require("express-rate-limit");
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
  getMe,
} = require("../../controllers/auth");
const { protect, authorize } = require("../../middleware/auth");
const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // dans une durée de 1 heure
  max: 5, // commencer a bloquer à partir de 5 requête
  message:
    "Beaucoup de comptes ont été créés à partir de cette adresse IP, veuillez réessayer dans une heure.",
});
const resetPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // dans une durée de 1 heure
  max: 3, // commencer a bloquer à partir de 5 requête
  message:
    "plusieurs tentatives de réinitialisation de mot de passe, veuillez réessayer dans une heure.",
});

router.post("/register", createAccountLimiter, register);
router.post("/login", login);
router.get("/logout", cleanCache, logout);
router.put("/updatedetails", protect, authorize("user"), updateDetails);
router.post("/updateemail", protect, authorize("user"), updateEmail);
router.put("/updatepassword", protect, authorize("user"), updatePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPasswordLimiter, resetPassword);
router.put("/resetemail/:resettoken", resetEmail);
router.get("/me", protect, authorize("user"), getMe);
module.exports = router;
