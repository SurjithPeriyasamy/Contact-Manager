const router = require("express").Router();
const {
  registeruser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const { validateToken } = require("../middlewares/validateTokenhandler");

router.post("/register", registeruser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router;
