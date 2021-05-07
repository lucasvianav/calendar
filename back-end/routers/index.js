const express = require('express');
const router = express.Router();

const eventsRouter = require('./event')
const authRouter = require('./auth')

router.use('/events', eventsRouter)
router.use('/auth', authRouter)

module.exports = router;