const express = require('express');
const postsRouter = require('./posts/postRouter');
const usersRouter = require('./users/userRouter');
const logger = require('./middleware/logger');

const server = express();
server.use(express.json({}))
server.use(postsRouter);
server.use(usersRouter);
//custom middleware
server.use(logger());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});




module.exports = server;
