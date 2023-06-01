const mongoose = require('mongoose')

const Schema = mongoose.Schema
const FileSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    strand: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    authors: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    approved: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('mainWebAppFiles', FileSchema)