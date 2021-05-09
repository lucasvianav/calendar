const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const authService = require('../services/auth')

require('dotenv').config()

passport.serializeUser((user, done) => done(null, user.googleId))

passport.deserializeUser((id, done) => done(null, {'salve': 'malandrio'}))

// SETUP GOOGLE STRATEGY
const google = {
    options: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `http://localhost:${process.env.CLIENT_PORT}/auth/google/callback`
    },

    callback: (accessToken, refreshToken, profile, done) => {
        const user = { name: profile.displayName, email: profile._json.email, googleId: profile.id }
        
        done(null, user)
    }
}

passport.use(new GoogleStrategy(google.options, google.callback))