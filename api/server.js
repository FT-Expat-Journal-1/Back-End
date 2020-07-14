require("dotenv").config(); //acces to .env variables
const express = require('express');
const helmet = require('helmet');   
const cors = require('cors');
const restricted = require('../auth/restricted.js')

//routers
const usersRouter  = require('../users/users-router.js')
const authRouter = require('../auth/auth-router.js')
const postsRouter = require('../posts/posts-router.js')

//server instance
const server = express();

//middleware
server.use(express.json()); //built into express
server.use(cors()); //node module
server.use(helmet()); //node module

//routes
server.use('/api/users', logger, restricted, usersRouter);
server.use('/api/auth', logger, authRouter);
server.use('/api/posts', logger, restricted, postsRouter);

//sanity check
server.get('/', logger, (req, res) =>{
    res.status(200).json({message: 'Wake Up, Neo'})
})

//export module
module.exports = server;

//logger middleware
function logger(req, res, next) {
    console.log(
        `[${new Date().toISOString()}] 
            \n ${req.method} to ${req.url} from ${req.get('Origin')}`
    );

    next();
}