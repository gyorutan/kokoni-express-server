const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signUp = async (res, body) => {
  try {
    const { username, studentId, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      username,
      studentId,
      email: studentId + "@shinshu-u.ac.jp",
      password: hashedPassword,
    });

    console.log({ createdUser });

    return res.json({
      success: true,
      message: "가입되었습니다",
      createdUser,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};

exports.logIn = async (res, body) => {
  try {
    const { studentId, password } = body;

    const user = await User.findOne({ studentId });

    if (!user) {
      return res.json({
        success: false,
        message: "아이디 또는 비밀번호가 일치하지 않습니다",
      });
    }

    const comparePassword = bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.json({
        success: false,
        message: "아이디 또는 비밀번호가 일치하지 않습니다",
      });
    }

    console.log({ user });

    // const payload = {
    //   id: user.id,
    // };

    // const token = jwt.sign(payload, process.env.JWT_SECRET, {
    //   expiresIn: "2h",
    // });

    // console.log(token);

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "none",
    // });

    return res.json({
      success: true,
      message: "로그인되었습니다",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "로그인 실패",
    });
  }
};

exports.validateStudentId = async (res, studentId) => {
  try {
    if (!studentId) {
      return res.json({
        success: false,
        message: "⚠  학번이 존재하지 않습니다",
      });
    }

    const studentIdExisting = await User.findOne({ studentId });

    if (studentIdExisting) {
      return res.json({
        success: false,
        message: "⚠  사용중인 학번입니다",
      });
    }

    return res.json({ success: true, message: "사용 가능한 학번입니다" });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "⚠  Server Error",
    });
  }
};

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
