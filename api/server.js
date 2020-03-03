require("dotenv").config(); //acces to .env variables
const express = require('express');
const helmet = require('helmet');   
const cors = require('cors');

//routers
const usersRouter  = require('../users/users-router.js')

//server instance
const server = express();

//middleware
server.use(express.json()); //built into express
server.use(cors()); //node module
server.use(helmet()); //node module

//routes
server.use('/api/users', logger, usersRouter);

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
            \n ${req.method} to ${req.url} from ${req.get('Origin')}`, {reqBody: req.body, reqHeaders: req.headers, resBody: res.body, resHeaders: res.headers} 
            
    );

    next();
}