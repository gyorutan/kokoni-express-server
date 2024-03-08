const nodemailer = require("nodemailer");

exports.sendVerificationCode = async (email, code) => {
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
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
      <h2 style="color: #333;">KOKONI 이메일 인증</h2>
      <p style="font-size: 18px; color: #666;">아래의 인증코드를 사용하여 이메일 인증을 완료하세요:</p>
      <div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);">
        <p style="font-size: 24px; color: #333; margin-bottom: 20px;">인증코드: <b style="color: #007bff;">${code}</b></p>
        <p style="font-size: 16px; color: #666;">인증코드를 다른 사람과 공유하지 마세요. 이 코드는 개인 정보를 보호하는 데 사용됩니다.</p>
      </div>
    </div>
  `,
  };

  const sendEmail = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
      console.log("이메일이 발송되었습니다");
    } catch (error) {
      console.log(error);
    }
  };

  sendEmail(transporter, mailOptions);
};
