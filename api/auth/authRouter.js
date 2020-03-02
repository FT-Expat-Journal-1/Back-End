const express = require('express');
const Users = require('../users/usersModel.js');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secrets.js");
const router = express();

router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    Users.insert(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json({message: `Error registering new user: ${error}`});
        })
});

router.post('/login', (req, res) => {
    const { username } = req.body;
    Users.findBy({ username })
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user);
                res.status(200).json({message: `User login successful.`, token});
            } else {
                res.status(401).json({message: `Invalid user credentials.`});
            }
        })
        .catch(error => {
            res.status(500).json({message: `Error logging in user: ${error}`});
        })
});

router.post('/logout', (req, res) => {
    // JWT ?
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role || "user", //attaches 
    };
    const options = {
        expiresIn: "1h",
    };
    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;