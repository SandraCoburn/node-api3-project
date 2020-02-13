const express = require("express");

const server = express();

const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

//routes - endpoint
server.use("/api/posts", logger, postRouter);
server.use("/api/users", logger, userRouter);

//Global middleware
server.use(express.json());
server.use(logger);

server.get("/", logger, (req, res, next) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `${req.method} Requests to ${
      req.originalURL
    } at [${new Date().toISOString()}]`
  );
  next();
}

module.exports = server;
