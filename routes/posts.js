const express = require('express');
const router = express.Router();
const Post = require('../models/post');

const verifyToken = require('../verifyToken')
router.use(verifyToken);


// Create a new post
router.post('/', async (req, res) => {
    try {
        const postData = new Post({ 
            user: req.body.user,
            title: req.body.title,
            text: req.body.text,
            topic: req.body.topic,
            expiration_time: req.body.expiration_time,
            owner: req.body.owner,
        });

        const postToSave = await postData.save();
        res.status(201).send(postToSave);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        const getPosts = await Post.find().limit(10);
        res.send(getPosts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific post by ID
router.get('/:postId', async (req, res) => {
    try {
        const getPostById = await Post.findById(req.params.postId);
        res.send(getPostById);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a post by ID
router.patch('/:postId', async (req, res) => {
    try {
        const updatePostById = await Post.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    user: req.body.user,
                    title: req.body.title,
                    text: req.body.text,
                    topic: req.body.topic,
                    expiration_time: req.body.expiration_time,
                    owner: req.body.owner,
                }
            }
        );
        res.send(updatePostById);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a post by ID
router.delete('/:postId', async (req, res) => {
    try {
        const deletePostById = await Post.deleteOne({ _id: req.params.postId });
        res.send(deletePostById);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
