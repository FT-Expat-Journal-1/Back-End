const router = require('express').Router();
const Users = require('./users-model.js'); //Users Model
const Posts = require('../posts/posts-model.js') //Posts Model
const bcrypt = require('bcryptjs');

//GET all users
router.get('/', (req, res) =>{
    Users.find()
    .then(users =>{
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({message: 'Failed To Get Users'})
    })
})
//GET user by id
router.get('/:id', (req, res) =>{
    Users.findById(req.params.id).then(user =>{
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({message: 'Failed To Get User With That ID'})
    })
})
//GET user's posts
router.get('/:id/posts', (req, res) => {
    Users.findById(req.params.id)
    .then(user =>{
        if(user){
            Posts.findBy({user_id: user.id}).then(posts =>{
                res.status(200).json(posts)
            })
            .catch(err =>{
                res.status(401).json({message: `Failed To Find Posts For: ${user.username}`})
            })
        } else{
            res.status(401).json({message: `Failed To Find User With ID: ${req.params.id} `})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Failed To Get Users Posts'})
    })
})
//UPDATE user
router.put('/:id', (req,res) =>{
    const {id} = req.params;
    const updatedUser = req.body;
    Users.findById(id).then(user =>{
        console.log('FOUND USER:', user)
        console.log('UPDATED USER:', updatedUser)
        if(user && bcrypt.compareSync(updatedUser.password, user.password)){
            console.log('user password not changed')
            Users.update(updatedUser, id)
            .then(updated =>{
                res.status(201).json({success: 'updated', id: user.id, updated: updatedUser})
            })
        }else if(user && (!bcrypt.compareSync(updatedUser.password, user.password))){
            console.log('user password was changed')
            const hash = bcrypt.hashSync(updatedUser.password, 8); //hashes the updated password
            updatedUser.password = hash; //sets updated user password value to hashed password
            Users.update(updatedUser, id).then(updated =>{
                res.status(201).json({success: 'updated', id: user.id, updated: updatedUser})
            })
        }else{
            res.status(401).json({message: `Could Not Find User With ID: ${id}`})
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Failed To Update User' });
      });
})
//DELETE user
router.delete('/:id', (req, res) =>{
    Users.findById(req.params.id).then(user =>{
        if(user){
            Users.remove(req.params.id).then(removed =>{
                res.status(200).json({success: 'deleted', id: user.id});
            }).catch(err=>{
                res.status(500).json({message: `Failed To Delete User w/ ID: ${req.params.id}`})
            })
        }else{
            res.status(401).json({message: `Could not Find User w/ ID: ${req.params.id}`})
        }
    }).catch(err => {
        res.status(500).json({message: 'Failed To Delete Users'})
    })
})
module.exports = router;