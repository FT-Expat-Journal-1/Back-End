const express = require('express');
const Users = require('./usersModel.js');
const { validateUserId, validateUser } = require('./usersMiddleware.js');
const { userOnly } = require('../auth/restrictedMiddleware.js');
const router = express.Router();

// Create - POST

// To create a new user.
router.post('/', validateUser, (req, res) => {
    Users.insert(req.body)
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(error => {
            res.status(500).json({message: `Error adding new user: ${error}`});
        })
});

// Retrieve - GET

// To retrieve a list of all users & filter through them using sortby, sortdir, and limit.
router.get('/', (req, res) => {
    Users.find(req.query)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({message: `Error retrieving all users: ${error}`});
        })
});

// To retrieve a single user by the User ID.
router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user);
});

// Update - PUT

// To update a single user
router.put('/:id', userOnly, validateUser, validateUserId, (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    Users.update(id, changes)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(error => {
            res.status(500).json({message: `Error updating user profile: ${error}`});
        })
});

// Delete - DELETE

// To delete a single user
router.delete('/:id', validateUserId, (req, res) => {
    const { id } = req.params;
    Users.remove(id)
        .then(removed => {
            res.status(200).json(removed);
        })
        .catch(error => {
            res.status(500).json({message: `Error removing user from database: ${error}`});
        })
});

module.exports = router;