const express = require('express');
const db = require('../../data/dbConfig.js');

module.exports = {
    find,
    findById,
    findLikesById,
    assignLike,
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

function findLikesById(id) {
    return db('users_posts as l')
          .join('posts as p', 'p.id', 'l.post_id')
          .join('users as u', 'u.id', 'l.user_id')
          .select('u.id', 'u.username', 'p.title')
          .where('l.post_id', id);
}

function assignLike(post_id, user_id) {
     return db('users_posts')
          .returning(['id', 'user_id', 'post_id'])
          .insert(post_id, user_id)
}