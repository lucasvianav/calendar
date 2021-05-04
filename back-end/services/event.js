const Event = require('../models/event')
const Account = require('../models/account')

const eventService = {
    create: async (title, description, startDate, endDate, creator, guests) => {
        const user = await Account.findById(creator)

        // list of existing events that orverlap with the one being created
        const overlaps = await Event.find({
            // makes sure the creator is the same
            creator, 

            // overlapping possibilities
            $or: [ 
                // starts at the same time or in the middle of an already existing event
                { 
                    $and: [ 
                        { startDate: { $gte: startDate } },
                        { startDate: { $lt: endDate } }
                    ] 
                },

                // ends at the same time or in the middle of an already existing event
                { 
                    $and: [ 
                        { endDate: { $gt: startDate } },
                        { endDate: { $lte: endDate } }
                    ] 
                },

                // starts before and already existing event but ends after it
                { 
                    $and: [ 
                        { startDate: { $lte: startDate } },
                        { endDate: { $gte: endDate } }
                    ] 
                }
            ]
        }, 'title startDate endDate')
        
        if(guests.length){
            guests = await Account.find({ email: { $in: guests } }, '_id')
        }

        // if any overlap is found
        if(overlaps.length){
            const newEvent = null
            const error = {
                status: 409, // conflict
                json: { message: 'The event could not be created because it overlaps with existing events.', overlaps }
            }
        }

        else{
            try {
                const newEvent = await Event.create({ title, description, startDate, endDate, creator, guests })
                const error = null
            } 

            // if an error occurs, it means one of the event's fields if invalid
            catch(e){
                const newEvent = null
                const error = {
                    status: 400, // bad request
                    json: { message: 'An error ocurred.', overlaps }
                }

                // logs error
                console.log(e)
            }
        }

        return {newEvent, error}
    },

    update: async(userId, eventId, edits) => {
        const user = await Account.findById(userId)
        const oldEvent = await Event.findById(eventId)

        // if the event's date is edited it's necessary to check again 
        // for overlapping events. if it isn't, there'll be none
        const overlaps = !(edits.startDate || edits.endDate) ? [] : await Event.find({
            // makes sure the creator is the same
            creator: userId, 

            // overlapping possibilities considering the event's new dates
            // edits.startDate || oldEvent.startDate --> the new date or the old one if there's no new date
            // edits.endDate || oldEvent.endDate --> the new date or the old one if there's no new date
            $or: [ 
                // starts at the same time or in the middle of an already existing event
                { 
                    $and: [ 
                        { startDate: { $gte: edits.startDate || oldEvent.startDate } },
                        { startDate: { $lt: edits.endDate || oldEvent.endDate } }
                    ] 
                },

                // ends at the same time or in the middle of an already existing event
                { 
                    $and: [ 
                        { endDate: { $gt: edits.startDate || oldEvent.startDate } },
                        { endDate: { $lte: edits.endDate || oldEvent.endDate } }
                    ] 
                },

                // starts before and already existing event but ends after it
                { 
                    $and: [ 
                        { startDate: { $lte: edits.startDate || oldEvent.startDate } },
                        { endDate: { $gte: edits.endDate || oldEvent.endDate } }
                    ] 
                }
            ]
        }, 'title startDate endDate')

        if(edits.guests.length){
            edits.guests = await Account.find({ email: { $in: guests } }, '_id')
        }

        // if any overlap is found
        if(overlaps.length){
            const newEvent = null
            const error = {
                status: 409, // conflict
                json: { message: 'The event could not be edited because it would overlap with other events.', overlaps }
            }
        }

        else{
            try {
                // const { title, description, startDate, endDate, guests } = edits
                const updates = {}
                if(edits.title){ updates.title = edits.title }
                if(edits.description){ updates.description = edits.description }
                if(edits.startDate){ updates.startDate = edits.startDate }
                if(edits.endDate){ updates.endDate = edits.endDate }
                if(edits.guests){ 
                    updates.addGuests = edits.guests.filter(g => !oldEvent.guests.includes(g)) 
                }

                const newEvent = Event.findByIdAndUpdate(eventId, {$set: {}})
                const error = null
            } 

            // if an error occurs, it means one of the event's fields if invalid
            catch(e){
                const newEvent = null
                const error = {
                    status: 400, // bad request
                    json: { message: 'An error ocurred.', overlaps }
                }

                // logs error
                console.log(e)
            }
        }

        return {newEvent, error}

    rsvp: async (req, res) => {
        const {guestId, eventId} = req.params
        const {bool} = req.body
        const respose = eventService.rsvp(guestId, eventId, bool)

        return res.status(response.status).json(response.json)
    },

    find: async (req, res) => { 
        const {userId} = req.params
        const account = await eventService.find(userId)

        return account ? res.status(200).json(account) : res.status(404).json({})
    },

    delete: async(req, res) => {
        const {userId, eventId} = req.params
        await eventService.delete(userId, eventId)

        return res.status(200).json({})
    }
}

module.exports = eventService