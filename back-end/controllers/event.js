const eventService = require('../services/event')

const eventController = {
    create: async (req, res) => {
        const {userId} = req.params
        const {title, description, startDate, endDate, guests} = req.body
        const {event, error} = await eventService.create(title, description, startDate, endDate, userId, guests)

        return event ? res.status(200).json(event) : res.status(error.status).json(error.json)
    },

    update: async(req, res) => {
        const {userId, eventId} = req.params
        const {edits} = req.body
        const {event, error} = await eventService.update(userId, eventId, edits)

        return event ? res.status(200).json(event) : res.status(error.code).json(error.json)
    },
    
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

module.exports = eventController