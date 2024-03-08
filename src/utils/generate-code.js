const Code = require("../models/Code");

exports.generateCode = async (email) => {
  const code = Math.floor(Math.random() * 899999) + 100000;

  console.log({ code });

  const alreadyGeneratedCode = await Code.findOne({ email });

  if (alreadyGeneratedCode) {
    await Code.deleteOne({ email });
  }

  const generatedCode = await Code.create({
    email,
    code,
  });

  console.log({ generatedCode });

  return code;
};
