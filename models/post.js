const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        enum: ['Politics', 'Health', 'Sport', 'Tech', 'my latest post is here!'],
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    expiration_time: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Live', 'Expired'],
        default: 'Live',
    },
    owner: {
        type: String,
        required: true,
    },
   
    
});

module.exports = mongoose.model('posts', PostSchema);
