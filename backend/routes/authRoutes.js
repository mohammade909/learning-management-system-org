const experss = require("express");
const router = experss.Router();

const {  isAuthenticatedUser } = require("../middlewares/authMiddleware");
const { signin,signout, updateProfile,checkPermissions, addPermissions, forgotPassword, resetPassword, getProfile } = require("../controllers/authController");
router.post("/signin", signin);
router.get("/signout", signout);
router.post("/update",isAuthenticatedUser, updateProfile);
router.get("/",isAuthenticatedUser, getProfile);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
