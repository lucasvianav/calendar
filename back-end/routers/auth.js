const router = require('express').Router()
const authController = require('../controllers/auth')

router.get('/', authController.find)
router.post('/signup', authController.signup)
router.post('/signin', authController.signin)

module.exports = router