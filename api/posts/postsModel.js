const express = require('express');
const db = require('../../data/dbConfig.js');

module.exports = {
    find,
    findById,
    insert,
    update,
    remove
}

function find() {
    return db('posts');
}

function findById(id) {
    return db('posts')
        .where({ id })
        .first();
}

function insert(newPost) {
    return db('posts')
        .returning(['id', 'body'])
        .insert(newPost);
}

function update(id, changes) {
    return db('posts')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('posts')
        .where({ id })
        .del();
}