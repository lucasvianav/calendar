const eventService = require('../services/event')

const eventController = {
    create: async (req, res) => {
        const {userId} = req.params
        const {title, description, startDate, endDate, guests} = req.body
        const {newEvent, error} = await eventService.create(title, description, startDate, endDate, userId, guests)

        return newEvent ? res.status(200).json(newEvent) : res.status(error.status).json(error.json)
    },

    update: async(req, res) => {
        const {userId, eventId} = req.params
        const {edits} = req.body
        const {newEvent, error} = await eventService.update(userId, eventId, edits)

        return newEvent ? res.status(200).json(newEvent) : res.status(error.code).json(error.json)
    },
    
    rsvp: async (req, res) => {
        const {guestId, eventId} = req.params
        const {bool} = req.body
        const respose = eventService.rsvp(guestId, eventId, bool)

        return res.status(response.status).json(response.json)
    },

    find: async (req, res) => { 
        const {userId} = req.params
        const events = await eventService.find(userId)

        // if the list is empty, it means no events were found
        return  res.status(events.length ? 200 : 404).json(events)
    },

    delete: async(req, res) => {
        const {userId, eventId} = req.params
        const status = await eventService.delete(userId, eventId)

        return res.status(status).json({})
    }
}

module.exports = eventController