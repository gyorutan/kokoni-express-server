const router = require("express").Router();
const {
  signUp,
  logIn,
  checkingStudentId,
  validateStudentId,
  validateUsername,
  //   checkUsername,
  //   checkStudentId,
} = require("../auth/auth.controller");

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/check/:studentId", checkingStudentId);
router.get("/validate/studentId/:studentId", validateStudentId);
router.get("/validate/username/:username", validateUsername);

// router.get("/logout", logOut);
// router.get("/username/:value", checkUsername);
// router.get("/studentId/:value", checkStudentId);

module.exports = router;
