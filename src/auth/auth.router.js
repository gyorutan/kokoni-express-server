const router = require("express").Router();
const {
  checkEmailVerified,
  compareVerificationCode,
  handleUsername,
  handleUser,
  compareUserPassword,
  sendingEmail,
  signUp,
  logIn,
  checkingStudentId,
  validateStudentId,
  validateUsername,
  //   checkUsername,
  //   checkStudentId,
} = require("../auth/auth.controller");

router.get("/check/email/:email", checkEmailVerified);
router.post("/verify/:email", compareVerificationCode);
router.patch("/username/:username", handleUsername);
router.patch("/user/:email", handleUser);
router.post("/user/:email", compareUserPassword);
// router.get("/verify/:email", sendingEmail);
// router.post("/signup", signUp);
// router.post("/login", logIn);
// router.get("/check/:studentId", checkingStudentId);
// router.get("/validate/studentId/:studentId", validateStudentId);
// router.get("/validate/username/:username", validateUsername);

// router.get("/logout", logOut);
// router.get("/username/:value", checkUsername);
// router.get("/studentId/:value", checkStudentId);

module.exports = router;
