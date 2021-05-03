const eventSchema = mongoose.Schema({
    title: {
        type: string,
        trim: true,
        required: true
    },
    description: {
        type: string,
        trim: true,
        default: '',
        required: true
    },
    startDate: {
        type: Date,
        default: new Date,
        alias: 'start',
        min: Date.now,
        required: true
    },
    endDate: {
        type: Date,
        alias: 'end',
        min: new Date,
        required: true
    },
    creator: {
        type: mongoose.ObjectId,
        required: true
    },
    guests: {
        type: [{ '_id': mongoose.ObjectId, 'RSVP': Boolean }],
        default: [],
        required: true
    }
})