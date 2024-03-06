const {
  signUp,
  logIn,
  checkingStudentId,
  validateStudentId,
  validateUsername
} = require("../auth/auth.service");

exports.signUp = async (req, res) => {
  const body = await req.body;
  return await signUp(res, body);
};

exports.logIn = async (req, res) => {
  const body = await req.body;
  return await logIn(res, body);
};

exports.checkingStudentId = async (req, res) => {
  const { studentId } = await req.params;
  return await checkingStudentId(res, studentId);
};

exports.validateStudentId = async (req, res) => {
  const { studentId } = await req.params;
  return await validateStudentId(res, studentId);
};

exports.validateUsername= async (req, res) => {
  const { username } = await req.params;
  return await validateUsername(res, username);
}

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
