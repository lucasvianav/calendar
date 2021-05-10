const Event = require('../models/event')
const Account = require('../models/account')

const eventService = {
    create: async (title, description, startDate, endDate, creator, guests) => {
        // if the event is supposed to start in the past or it's 
        // duration is lower than 5 minutes, it's invalid
        if(new Date(endDate) - new Date(startDate) < 5*60*1000){
            return {
                event: null,
                status: 400, // bad request
                message: 'The event could not be created because it\'s dates are invalid. A new event last more than 5 minutes.', 
                overlaps: [] 
            }
        }

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
        
        // if any overlap is found
        if(overlaps.length){
            return {
                event: null,
                status: 409, // conflict
                message: 'The event could not be created because it overlaps with existing events.',
                overlaps 
            }
        }

        // if guests are invited, fetch their id from their emails
        // and creates a list of objects like the guestSchema with no RSVP
        // guests = [ { _id: guest_id } ]
        if(guests.length){
            guests = (await Account.find({ email: { $in: guests } }, '_id')).map(_id => ( { _id } ))
        }

        const returnValue = {}

        try {
            returnValue.event = await Event.create({ title, description, startDate, endDate, creator, guests })
            returnValue.status = 200
        } 

        // if an error occurs, it means one of the event's fields if invalid
        catch(e){
            returnValue.event = null
            returnValue.status = 400
            returnValue.message = 'An error ocurred.' 
            returnValue.overlaps = overlaps

            // logs error
            console.log(e)
        }

        // same as { newEvent, error }
        return returnValue
    },

    update: async(userId, eventId, edits) => {
        const oldEvent = await Event.findById(eventId)

        // if the event's duration is lower than 5 minutes, it's invalid
        // edits.startDate || oldEvent.startDate --> the new date or the old one if there's no new date
        // edits.endDate || oldEvent.endDate --> the new date or the old one if there's no new date
        if(
            (edits.startDate || edits.endDate) &&
            (
                new Date(edits.endDate || oldEvent.endDate) - new Date(edits.startDate || oldEvent.startDate) < 5*60*1000
            )
        ){
            return {
                event: null,
                status: 400,
                message: 'The event could not be created because it\'s dates are invalid. A new event cannot start in the past nor last less than 5 minutes.', 
                overlaps: [] 
            }
        }

        // if the event's date is edited it's necessary to check again 
        // for overlapping events. if it isn't, there'll be none
        const overlaps = !(edits.startDate || edits.endDate) ? [] : await Event.find({
            // makes sure the creator is the same
            creator: userId, 
            
            // the event doesn't overlap with itsel
            _id: { $ne: eventId },

            // overlapping possibilities considering the event's new dates
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
        
        const returnValue = {}

        // if any overlap is found
        if(overlaps.length){
            returnValue.event = null
            returnValue.status = 409, // conflict
            returnValue.message = 'The event could not be edited because it would overlap with other events.', 
            returnValue.overlaps = overlaps
        }

        else{
            // if the guest list is to be edited, fetch the guests' id
            if(edits.guests && edits.guests.length){
                edits.guests = await Account.find({ email: { $in: guests } }, '_id')
            }

            const updates = { 
                set: {}, // variable that'll have it's values changed
                guests: { // list that'll be updated
                    add: [], // guests that'll be added to the event
                    remove: [] // guests that'll be removed from the event
                }
            }

            if(edits.title){ updates.set.title = edits.title }
            if(edits.description){ updates.set.description = edits.description }
            if(edits.startDate){ updates.set.startDate = edits.startDate }
            if(edits.endDate){ updates.set.endDate = edits.endDate }

            // users that were added as guests will be removed
            // and users that weren't will be added as guests
            if(edits.guests && edits.guests.length){
                updates.guests.add = edits.guests.filter(_id => !oldEvent.guests.any(g => g._id == _id)).map(_id => ( { _id } )) 
                updates.guests.remove = edits.guests.filter(_id => oldEvent.guests.any(g => g._id == _id))
            }


            try {
                const targetEvent = await Event.findById(eventId)

                if(targetEvent){
                    returnValue.event = await Event.findByIdAndUpdate(eventId, {
                        // updates non-list variables
                        $set: { ...updates.set }, 

                        // appends guests to the array
                        $push: { guests: { $each: updates.guests.add } }, 
                    }, { new: true })
                    
                    // removes guests from the array (if there are any to remove)
                    if(updates.guests.remove.length){
                        returnValue.event = await Event.findByIdAndUpdate(eventId, {
                            $pull: {
                                guests: { 
                                    _id: { $in: updates.guests.remove } 
                                } 
                            } 
                        }, { new: true })
                    }
                    
                    returnValue.status = 200
                }
                
                else{
                    returnValue.event = null
                    returnValue.status = 404,
                    returnValue.message = 'Unfortunately, this event was not found.' 
                }
            } 

            // if an error occurs, it means one of the event's fields if invalid
            catch(e){
                returnValue.newEvent = null
                returnValue.status = 400, // bad request
                returnValue.message = 'An error ocurred.', 
                returnValue.overlaps = overlaps

                // logs error
                console.log(e)
            }
        }

        return returnValue
    },

    rsvp: async (guestId, eventId, bool) => {
        const targetEvent = await Event.findById(eventId)
        
        // searchs for a guest with this one's id
        guest = targetEvent.guests.find(g => g._id == guestId)
        
        const returnValue = {}
        
        // if the user is a guest at that event
        if(guest){
            guest.RSVP = bool

            try {
                returnValue.status = 200
                returnValue.event = await Event.findByIdAndUpdate(eventId, { $set: { guests: targetEvent.guests } }, { new: true })
            } 

            // if an error occurs, it means the received bool is not a Boolean
            catch(e){
                returnValue.status = 400 // bad request
                returnValue.message = 'An error ocurred.' 

                // logs error
                console.log(e)
            }
        }
        
        else{
            returnValue.status = 409
            returnValue.json = { message: 'Unfortunately, this guest was not invited to this event.' }
        }

        return returnValue
    },

    find: async (userId) => await Event.find({creator: userId}),

    delete: async(userId, eventId) => {
        try {
            await Event.findOneAndDelete({ _id: eventId, creator: userId })
            return 200
        } 

        catch(e){ return 400 }
    }
}

module.exports = eventService