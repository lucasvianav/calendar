const router = require('express').Router()
const eventController = require('../controllers/event')
const authController = require('../controllers/auth')

// sets up authentication middleware
router.use(authController.authenticate)

router.get('/:userId', eventController.find)
router.post('/:userId', eventController.create)
router.put('/:userId/:eventId', eventController.update)
router.put('/rsvp/:guestId/:eventId', eventController.rsvp)
router.delete('/:userId/:eventId', eventController.delete)

module.exports = router