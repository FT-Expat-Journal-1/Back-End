const router = require('express').Router();
const express = require('express');
const Posts = require('./posts-model.js'); //Posts Model

//GET all posts
router.get('/', (req, res) =>{
    Posts.find()
    .then(posts =>{
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({message: 'Failed To Get Posts'})
    })
})
//GET post by id
router.get('/:id', (req, res) =>{
    Posts.findById(req.params.id).then(post =>{
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({message: 'Failed To Get Post With That ID'})
    })
})
//POST new Post
router.post('/', (req, res) =>{
    let newPost = req.body;
    Posts.insert(newPost).then(newPost=>{
        res.status(200).json(newPost)
    })
    .catch(err=>{
        res.status(500).json({message: 'Failed To Add New Post', postSent: newPost})
    })
})
//UPDATE post
router.put('/:id', (req,res) =>{
    const {id} = req.params;
    const changes = req.body;
 
    Posts.findById(id).then(post =>{
        if(post){
            Posts.update(changes, id)
            .then(updated =>{
                res.status(201).json({success: 'updated', id: post.id, ...changes})
            })
        }else{
            res.status(401).json({message: `Could Not Find Post With ID: ${id}`})
        }
    }).catch(err => {
        res.status(500).json({ message: 'Failed To Update Post' });
      });
})
//DELETE post
router.delete('/:id', (req, res) =>{
    Posts.findById(req.params.id).then(post =>{
        if(post){
            Posts.remove(req.params.id).then(removed =>{
                res.status(200).json({success: 'deleted', id: post.id});
            }).catch(err=>{
                res.status(500).json({message: `Failed To Delete Post w/ ID: ${req.params.id}`})
            })
        }else{
            res.status(401).json({message: `Could not Find Post w/ ID: ${req.params.id}`})
        }
    }).catch(err => {
        res.status(500).json({message: 'Failed To Delete Posts'})
    })
})
module.exports = router;