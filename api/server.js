require("dotenv").config(); //acces to .env variables
const express = require('express');
const helmet = require('helmet');   
const cors = require('cors');

//routers
// const someRouter  = require('./routerPath')

//server instance
const server = express();

//middleware
server.use(express.json()); //built into express
server.use(cors()); //node module
server.use(helmet()); //node module

//routes
// server.use('/api/someRoute', someRouter);

//sanity check
server.get('/', (req, res) =>{
    res.status(200).json({message: 'Wake Up, Neo'})
})

//export module
module.exports = server;