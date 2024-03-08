const nodemailer = require("nodemailer");

exports.sendVerifyEmail = async (email, code) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: {
      name: "KOKONI",
      address: process.env.USER,
    }, // sender address
    to: email, // list of receivers
    subject: "KOKONI 이메일 인증", // Subject line
    html: `<p>인증코드 : <b>${code}<b></p>`, // html body
  };

  const sendMail = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
      console.log("이메일이 발송되었습니다");
    } catch (error) {
      console.log(error);
    }
  };

  sendMail(transporter, mailOptions);
};

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // Use `true` for port 465, `false` for all other ports
//   auth: {
//     user: process.env.USER,
//     pass: process.env.APP_PASSWORD,
//   },
// });

// const mailOptions = {
//   from: {
//     name: "KOKONI",
//     address: process.env.USER,
//   }, // sender address
//   to: ["17j1029e@shinshu-u.ac.jp"], // list of receivers
//   subject: "KOKONI 이메일 인증", // Subject line
//   text: "이메일 인증을 진행하세요", // plain text body
//   html: "<b>Hello world?</b>", // html body
// };

// const sendMail = async (transporter, mailOptions) => {
//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("이메일이 발송되었습니다");
//   } catch (error) {
//     console.log(error);
//   }
// };

// sendMail(transporter, mailOptions);

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);
