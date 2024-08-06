const experss = require("express");
const router = experss.Router();

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const {
  markAttendance,
  addUser,
  requestLeave,
  approveLeave,
  getAllAttendances,
  declineLeave,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  getChildsParentInfo,
  getChildrenAndUserInfo,updateStatus
} = require("../controllers/userController");


router.get("/", getUsers);
router.get("/parents/:user_id", getChildsParentInfo);
router.get("/childrens/:user_id", getChildrenAndUserInfo);

router.post("/add", addUser);
router.delete("/:userId", deleteUser);
router.put("/status/:userId", updateStatus);
router.post("/:userId", updateUser);
router.get("/:userId", getUserById);
router.post("/attendance/mark", markAttendance);
router.get("/attendance/all", getAllAttendances);

// Leave request routes
router.post("/leave/request", requestLeave);
router.post("/leave/approve", approveLeave);
router.post("/leave/decline", declineLeave);

module.exports = router;
