const router = require('express').Router()
const eventController = require('../controllers/event')

router.get('/:userId', eventController.find)

router.post('/:userId', eventController.create)

router.put('/:userId/:eventId', eventController.update)

router.put('/:guestId/:eventId', eventController.rsvp)

router.delete('/:userId/:eventId', eventController.delete)

module.exports = router