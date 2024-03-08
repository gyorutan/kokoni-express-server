const express = require("express");
require("dotenv").config();

const { connectDB } = require("./src/libs/database");

connectDB();

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// Router settings
const authRouter = require("./src/auth/auth.router");
const { generateCode } = require("./src/utils/generate-code");

app.use(express.json());
app.use("/api/auth", authRouter);

// Healthcheck
app.get("/", async (req, res) => {
  res.json("서버 연결에 성공하였습니다");
  generateCode();
});

// const usersRouter = require("./src/users/users.router");
// const postsRouter = require("./src/posts/posts.router");

// app.use("/api/auth", authRouter);
// app.use("/api/users", usersRouter);
// app.use("/api/posts", postsRouter);
