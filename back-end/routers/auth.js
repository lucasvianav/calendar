const router = require('express').Router()
const passport = require('passport')
const authController = require('../controllers/auth')

router.get('/signup', authController.signup)
router.get('/signin', authController.signin)

router.get('/google', passport.authenticate('google', {scope: ['email', 'profile']}))
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log('alo!')
    console.log()
    console.log(req.body)
    console.log()
    console.log(req.params)
})

module.exports = router