const eventSchema = mongoose.Schema({
    title: {
        type: string,
        trim: true,
        required: true
    },
    description: {
        type: string,
        trim: true,
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
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    guests: {
        type: [mongoose.ObjectId],
        default: [],
        required: true
    }
})