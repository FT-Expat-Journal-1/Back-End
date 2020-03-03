const express = require('express');
const Posts = require('./postsModel.js');

module.exports = {
    validatePostId,
    validatePost
}

// Validate Post ID - checks if ID is in the database or not.

function validatePostId(req, res, next) {
    const { id } = req.params;
    Posts.findById(id)
        .then(post => {
            if(post){
                req.post = post;
                next();
            } else {
                res.status(404).json({message: `Post ID does not exist.`})
            }
        })
        .catch(error => {
            res.status(500).json({message: `Error retrieving single post: ${error}`});
        })
}

// Validate Post - checks if req contains all required values for post/put.

function validatePost(req, res, next){
    const { user_id, title, body, img_url } = req.body;
    if(!req.body){
        res.status(400).json({message: `Missing Post Information.`});
    } else if(!user_id || ! title || !body || !img_url){
        res.status(400).json({message: `Please include post information: User Id, Title, Body, and Image.`});
    } else {
        next();
    }
}