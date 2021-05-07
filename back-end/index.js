const cors = require('cors')
const express = require('express')

const app = express() // server app
const routers = require('./routers') // request endpoints
const mongoose = require('mongoose')
const db = require('./config/mongodb') // database
const passport = require('passport') // OAuth

// Require Passport config
// require('./config/passport')

// get .env file's data
require('dotenv').config();

// avoid deprecated congif
mongoose.set('useFindAndModify', false)

// request body parsers
app.use(express.json({limit: '30mb'}))
app.use(express.urlencoded({ extended: true }))

// enable requests from different origins
app.use(cors({ origin: 'http://localhost:' + process.env.CLIENT_PORT, optionsSuccessStatus: 200, }))

// setup routers
app.use('/api', routers)

// setup passport
app.use(passport.initialize())
// app.use(passport.session())

// start server
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => app.listen(process.env.SERVER_PORT, () => console.log(`Example app listening at http://localhost:` + process.env.SERVER_PORT)))
