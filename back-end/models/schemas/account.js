const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    googleId: {
        type: String,
        unique: true,
        required: true
    }
})

module.exports = accountSchema