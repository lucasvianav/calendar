const mongoose = require('mongoose')

const guestSchema = mongoose.Schema({
    _id: {
        type: mongoose.ObjectId,
        required: true
    },
    RSVP: {
        type: Boolean,
        required: false
    }
})

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        default: '',
        required: true
    },
    startDate: {
        type: Date,
        default: new Date,
        alias: 'start',
        required: true
    },
    endDate: {
        type: Date,
        alias: 'end',
        required: true
    },
    creator: {
        type: mongoose.ObjectId,
        required: true
    },
    guests: {
        type: [guestSchema],
        default: [],
        required: true
    }
})

module.exports = eventSchema