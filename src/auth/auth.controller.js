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
} = require("../auth/auth.service");

exports.checkEmailVerified = async (req, res) => {
  const { email } = req.params;
  return await checkEmailVerified(res, email);
};

exports.compareVerificationCode = async (req, res) => {
  const { email } = req.params;
  const body = await req.body;
  console.log(body);
  return await compareVerificationCode(res, body, email);
};

exports.handleUsername = async (req, res) => {
  const { username } = req.params;
  const body = await req.body;
  return await handleUsername(res, body, username);
};

exports.handleUser = async (req, res) => {
  const { email } = req.params;
  const body = await req.body;
  return await handleUser(res, body, email);
};

exports.compareUserPassword = async (req, res) => {
  const { email } = req.params;
  const body = await req.body;
  return await compareUserPassword(res, body, email);
};

// exports.sendingEmail = async (req, res) => {
//   const { email } = req.params;
//   return await sendingEmail(res, email);
// };

// exports.signUp = async (req, res) => {
//   const body = await req.body;
//   return await signUp(res, body);
// };

// exports.logIn = async (req, res) => {
//   const body = await req.body;
//   return await logIn(res, body);
// };

// exports.checkingStudentId = async (req, res) => {
//   const { studentId } = await req.params;
//   return await checkingStudentId(res, studentId);
// };

// exports.validateStudentId = async (req, res) => {
//   const { studentId } = await req.params;
//   return await validateStudentId(res, studentId);
// };

// exports.validateUsername = async (req, res) => {
//   const { username } = await req.params;
//   return await validateUsername(res, username);
// };

//   exports.logOut = async (req, res) => {
//     res.clearCookie("token");
//     return res.json({ success: true });
//   };

//   exports.checkUsername = async (req, res) => {
//     const { value } = await req.params;
//     return await checkUsername(res, value);
//   };

//   exports.checkStudentId = async (req, res) => {
//     const { value } = await req.params;
//     return await checkStudentId(res, value);
//   };
