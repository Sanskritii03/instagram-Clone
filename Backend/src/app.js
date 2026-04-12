const express = require("express");
const authRouter = require("./router/auth.routes");
const postRouter = require("./router/post.routes");
const cookieParser = require("cookie-parser");
const userRouter = require("./router/user.routes");
const cors = require("cors")

const app = express();


app.use(express.json());
app.use(cookieParser());

 app.use(
     cors(
         {
              credentials: true,
              origin: "http://localhost:5173"
          }
     ))

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.use("/api/users", userRouter);

module.exports = app;
