const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js')
const { jwtSecret } = require('../config/secrets.js')

//POST new user
router.post('/register', (req,res) =>{
    let newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 8); // 2 ^ n //hashes password
    newUser.password = hash;
    console.log('the user is:', newUser);
    Users.insert(newUser).then(user =>{
        res.status(200).json(user)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message: 'Failed To Add New User', userSent: req.body})
    })
})
//POST Login
router.post('/login', (req, res) =>{
    let { username, password } = req.body;

    Users.findBy({username})
    .first()
    .then(user=>{
        if(user && bcrypt.compareSync(password, user.password)){ //compares password to hashed password on server
            const token = generateToken(user); //generates a token
            res.status(200).json({
                message: `Welcome ${user.username}!`,
                token, 
                id: user.id,
                username: user.username
            })
        }else{
            res.status(401).json({message: 'Invalid Credentails'});
        }
    })
    .catch(err =>{
        res.status(500).json({error: 'Internal Error, cannot log in'})
    })
})

//Generates and signs a token
function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
      role: user.role || "user",
    };
  
    const options = {
      expiresIn: "1h", //token expires after 1h
    };
  
    return jwt.sign(payload, jwtSecret, options);
  }
module.exports = router;