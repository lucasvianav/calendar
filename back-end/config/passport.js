const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const authService = require('../services/auth')

require('dotenv').config()

// SETUP GOOGLE STRATEGY
const google = {
    options: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    },

    callback: authService.login
}

passport.use(new GoogleStrategy(google.options, google.callback))