const eventService = require('../services/event')

const eventController = {
    create: async (req, res) => {
        const {userId} = req.params
        const {title, description, startDate, endDate, guests} = req.body

        const r = await eventService.create(title, description, startDate, endDate, userId, guests)

        return res.status(200).json(r)
    },

    update: async(req, res) => {
        const {userId, eventId} = req.params
        const {edits} = req.body

        const r = await eventService.update(userId, eventId, edits)

        return res.status(200).json(r)
    },
    
    rsvp: async (req, res) => {
        const {guestId, eventId} = req.params
        const {bool} = req.body

        const r = eventService.rsvp(guestId, eventId, bool)

        return res.status(200).json(r)
    },

    find: async (req, res) => { 
        const {userId} = req.params
        const events = await eventService.find(userId)

        // if the list is empty, it means no events were found
        return  res.status(200).json({ events, status: events.length ? 200 : 404 })
    },

    delete: async(req, res) => {
        const {userId, eventId} = req.params
        const status = await eventService.delete(userId, eventId)

        return res.status(200).json({status})
    }
}

module.exports = eventController