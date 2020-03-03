const express = require('express');
const Posts = require('./postsModel.js');
const { validatePostId, validatePost } = require('./postsMiddleware.js');
const router = express.Router();

// Create - POST

// To create a new post.
router.post('/', validatePost, (req, res) => {
    Posts.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => {
            res.status(500).json({message: `Error adding new post: ${error}`});
        })
});

// Retrieve - GET

// To retrieve a list of all posts & filter through them using sortby, sortdir, date, and limit.
router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({message: `Error retrieving all posts: ${error}`});
        })
});

// To retrieve a single post by the Post ID.
router.get('/:id', validatePostId, (req, res) => {
    res.status(200).json(req.post);
});

// Update - PUT

// To update a single post
router.put('/:id', validatePost, validatePostId, (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    Posts.update(id, changes)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(error => {
            res.status(500).json({message: `Error updating post: ${error}`});
        })
});

// Delete - DELETE

// To delete a single post
router.delete('/:id', validatePostId, (req, res) => {
    const { id } = req.params;
    Posts.remove(id)
        .then(removed => {
            res.status(200).json(removed);
        })
        .catch(error => {
            res.status(500).json({message: `Error removing post from database: ${error}`});
        })
});

// LIKES

// To assign a user like to a post



// To retrieve an array of users who have liked a post



module.exports = router;