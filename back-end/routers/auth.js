const router = require('express').Router()
const authController = require('../controllers/auth')

router.get('/oauth', authController.oauth)
router.get('/signup', authController.signup)
router.get('/signin', authController.signin)

module.exports = router