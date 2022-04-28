const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const moment = require("moment");

// Vinit Chikate
const blogsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        authorId: {
            type: ObjectId,
            ref: "authorproject1",
            required: true
        },
        tags: String,
        category: {
            type: [String],
            required: true,
        },
        subcategory: String,
        deletedAt: {
            type: Date,
            dafault: null
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        publishedAt: {
            type: String,
            default: moment().format('MMMM Do YYYY, h:mm:ss a')
        },
        isPublished: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true })

module.exports = mongoose.model('blogsproject1', blogsSchema);