// vinitchikate
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            enum: ["Mr", "Mrs", "Miss"]
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }, { timeseries: true });

module.exports = mongoose.model('authorproject1', authorSchema)