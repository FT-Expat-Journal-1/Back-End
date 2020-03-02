const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { userOnly } = require('./auth/restrictedMiddleware.js');
const server = express();

// middleware
server.use(express.json());
server.use(cors());
server.use(helmet());

// Routers
const usersRouter = require('./users/usersRouter.js');
const postsRouter = require('./posts/postsRouter.js');
const authRouter = require('./auth/authRouter.js');

// Routes
server.use('/api/users', usersRouter);
server.use('/api/posts', userOnly, postsRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: `Welcome Expat Journal API, my friend.`});
})

module.exports = server;