// import mongoose from "mongoose";
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Movie', movieSchema);

