const express = require('express');
const postsRouter = require('./posts/postRouter');
const usersRouter = require('./users/userRouter');
const server = express();

const logger = require('./middleware/logger');

server.use(express.json());
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

server.use((err, req, res, next) => {
  console.log(err);
	return res.status(500).json({
		message: "Something went wrong, please try again later",
	});
});

//custom middleware
server.use(logger());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
