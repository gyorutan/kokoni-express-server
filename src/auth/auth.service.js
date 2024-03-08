const bcrypt = require("bcrypt");
const User = require("../models/User");
const Code = require("../models/Code");
const jwt = require("jsonwebtoken");
const { generateCode } = require("../utils/generate-code");
const { sendVerificationCode } = require("../services/send-verification-code");

exports.checkEmailVerified = async (res, email) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      console.log("인증된 계정");
      return res.json({ verified: true });
    } else {
      console.log("인증되지 않은 계정");
      const code = await generateCode(email);
      sendVerificationCode(email, code);

      return res.json({ verified: false });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Server Error" });
  }
};

exports.compareVerificationCode = async (res, body, email) => {
  console.log(email);
  const { code } = body;
  console.log(code);

  const generatedCode = await Code.findOne({ email });

  console.log({ generatedCode });

  console.log(generatedCode.code);

  if (generatedCode.code === parseInt(code)) {
    await Code.deleteOne({ email });
    const createdUser = await User.create({
      username: "",
      password: "",
      email,
      isVerified: new Date(),
    });
    console.log({ createdUser });
    return res.json({ success: true, message: "인증코드 일치" });
  }

  return res.json({ success: false, message: "인증코드 불일치" });
};

exports.handleUsername = async (res, body, username) => {
  try {
    const { email } = body;
    console.log(email);
    console.log(username);

    const usernameExisting = await User.findOne({ username }).exec();

    if (usernameExisting) {
      return res.json({
        success: false,
        message: "이미 사용중인 닉네임입니다",
      });
    }

    const user = await User.findOne({ email });

    await User.findByIdAndUpdate(user._id, {
      username,
    });

    return res.json({ success: true, message: "사용가능한 닉네임입니다" });
  } catch (error) {
    console.log(error);
  }
};

exports.handleUser = async (res, body, email) => {
  try {
    const { password } = body;
    console.log({ email });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.findOne({ email });

    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });

    return res.json({ success: true, message: "유저 저장완료" });
  } catch (error) {
    console.log(error);
  }
};

exports.compareUserPassword = async (res, body, email) => {
  try {
    const { password } = body;
    console.log({ email });

    const user = await User.findOne({ email });

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.json({
        success: false,
        message: "비밀번호가 일치하지 않습니다",
      });
    }

    return res.json({ success: true, message: "비밀번호가 일치합니다" });
  } catch (error) {
    console.log(error);
  }
};

// exports.signUp = async (res, body) => {
//   try {
//     const { username, studentId, password } = body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const createdUser = await User.create({
//       username,
//       studentId,
//       email: studentId + "@shinshu-u.ac.jp",
//       password: hashedPassword,
//     });

//     console.log({ createdUser });

//     return res.json({
//       success: true,
//       message: "가입되었습니다",
//       createdUser,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       success: false,
//       message: "서버 오류",
//       error: error.message,
//     });
//   }
// };

// exports.logIn = async (res, body) => {
//   try {
//     const { studentId, password } = body;

//     const user = await User.findOne({ studentId });

//     console.log({ user });

//     const comparePassword = await bcrypt.compare(password, user.password);

//     if (!comparePassword) {
//       return res.json({
//         success: false,
//         message: "비밀번호가 일치하지 않습니다",
//       });
//     }

//     const payload = {
//       id: user.id,
//     };

//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     return res.json({
//       success: true,
//       message: "로그인되었습니다",
//       user,
//       token,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       success: false,
//       message: "로그인 실패",
//     });
//   }
// };

// exports.checkingStudentId = async (res, studentId) => {
//   console.log({ studentId });
//   try {
//     const user = await User.findOne({ studentId });

//     if (!user) {
//       return res.json({
//         success: false,
//         message: "등록되지 않은 학생입니다",
//       });
//     }

//     return res.json({ success: true, message: "ok", user });
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// exports.validateStudentId = async (res, studentId) => {
//   try {
//     const studentIdExisting = await User.findOne({ studentId });

//     if (studentIdExisting) {
//       return res.json({
//         success: false,
//         message: "이미 사용중인 학번입니다",
//       });
//     }

//     return res.json({ success: true, message: "ok" });
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// exports.validateUsername = async (res, username) => {
//   try {
//     const user = await User.findOne({ username });

//     if (user) {
//       return res.json({
//         success: false,
//         message: "이미 사용중인 닉네임입니다",
//       });
//     }

//     return res.json({ success: true, message: "ok" });
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// exports.sendingEmail = async (res, email) => {
//   console.log({ email });

//   const code = generateCode();

//   sendVerifyEmail(email, code);

//   return res.json({ success: true, message: "이메일을 발송하였습니다" });
// };

// exports.checkUsername = async (res, value) => {
//   const user = await User.findOne({ username: value });

//   if (user) {
//     return res.json({ success: false, message: "invalid-username" });
//   }

//   return res.json({ success: true, message: "valid-username" });
// };

// exports.checkStudentId = async (res, value) => {
//   const user = await User.findOne({ studentId: value });

//   if (user) {
//     return res.json({ success: false, message: "invalid-studentId" });
//   }

//   return res.json({ success: true, message: "valid-studentId" });
// };
