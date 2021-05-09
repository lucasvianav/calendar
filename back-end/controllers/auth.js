const authService = require('../services/auth')
const passport = require('passport')

const authController = {
    oauth: async (req, res) => {
        console.log('oi')
        return await passport.authenticate('google', {scope: ['email', 'profile']})
    },

    signup: async (req, res) => {
        const {name, email, googleId} = req.body
        const r = await authService.signup(name, email, googleId)

        return res.status(r.status).json(r.json)
    },

    signin: async (req, res) => {
        const {googleId} = req.body
        const r = await authService.signin(googleId)

        return res.status(r.status).json(r.json)
    }
}

module.exports = authController