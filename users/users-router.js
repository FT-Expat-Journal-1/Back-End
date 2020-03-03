const router = require('express').Router();
const express = require('express');
const Users = require('./users-model.js'); //Users Model

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
        res.status(200).json({user})
    })
    .catch(err => {
        res.status(500).json({message: 'Failed To Get User With That ID'})
    })
})
//UPDATE user
router.put('/:id', (req,res) =>{
    const {id} = req.params;
    const changes = req.body;

    Users.findById(id).then(user =>{
        if(user){
            Users.update(changes, id)
            .then(updated =>{
                res.status(201).json({success: 'updated', id: user.id})
            })
        }else{
            res.status(401).json({message: `Could Not Find User With ID: ${id}`})
        }
    }).catch(err => {
        res.status(500).json({ message: 'Failed to update resource' });
      });
})
//DELETE user
router.delete('/:id', (req, res) =>{
    Users.findById(req.params.id).then(user =>{
        if(user){
            Users.remove(req.params.id).then(removed =>{
                res.status(200).json(removed);
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