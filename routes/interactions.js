const express = require('express');
const router = express.Router();
const Post = require('../models/comments');

const verifyToken = require('../verifyToken')

router.use(verifyToken);

// Get all posts
router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.find();
        res.json(allPosts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new post
router.post('/', async (req, res) => {
    try {
        const newPost = new Post({
            post_identifier: req.body.post_identifier,
            user: req.body.user,
            title: req.body.title,
            text: req.body.text,
            topic: req.body.topic,
            timestamp: req.body.timestamp,
            expiration_time: req.body.expiration_time,
            status: req.body.status,
            owner: req.body.owner,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
            comments: req.body.comments,
        });

        const savedPost = await newPost.save();
        res.json(savedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Like a post
router.post('/:postId/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        post.likes += 1;
        const updatedPost = await post.save();
        res.send(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dislike a post
router.post('/:postId/dislike', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        post.dislikes += 1;
        const updatedPost = await post.save();
        res.send(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Comment on a post
router.post('/:postId/comment', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        const newComment = {
            user: req.body.user,
            text: req.body.text,
            likes: 0,
            dislikes: 0,
        };
        post.comments.push(newComment);
        const updatedPost = await post.save();
        res.send(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Most active posts per topic
router.get('/most-active/:topic', async (req, res) => {
    try {
        const mostActivePosts = await Post.find({ topic: req.params.topic })
            .sort({ likes: -1, dislikes: 1 })
            .limit(1);
        res.send(mostActivePosts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Expired posts history per topic
router.get('/expired-history/:topic', async (req, res) => {
    try {
        const expiredHistory = await Post.find({
            topic: req.params.topic,
            status: 'Expired',
        }).sort({ expiration_time: -1 });
        res.send(expiredHistory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:postId', async (req, res) => {
    try {
        const deletePostById = await Post.deleteOne({ _id: req.params.postId });
        res.send(deletePostById);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
