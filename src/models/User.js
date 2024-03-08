const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    imageUrl: {
      type: String,
      default:
        "https://gyorutan-images.s3.ap-northeast-1.amazonaws.com/1704525658693",
    },
    isVerified: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
