const express = require('express');
const router = express.Router();

const eventsRouter = require('./event')

router.use('/events', eventsRouter)

module.exports = router;