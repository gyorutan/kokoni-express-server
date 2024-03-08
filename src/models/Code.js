const mongoose = require("mongoose");

const codeSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      ref: "User",
    },
    code: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Code = mongoose.model("Code", codeSchema);
module.exports = Code;
