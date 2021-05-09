const cors = require('cors')
const express = require('express')

const app = express() // server app
const routers = require('./routers') // request endpoints
const mongoose = require('mongoose')
const db = require('./mongodb') // database

// fix mongoose deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// avoid deprecated congif
mongoose.set('useFindAndModify', false)

// request body parsers
app.use(express.json({limit: '30mb'}))
app.use(express.urlencoded({ extended: true }))

// enable requests from different origins
app.use(cors({ origin: 'http://localhost:' + process.env.CLIENT_PORT, optionsSuccessStatus: 200, }))

// setup routers
app.use('/api', routers)

// start server
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => app.listen(process.env.SERVER_PORT, () => console.log(`Example app listening at http://localhost:` + process.env.SERVER_PORT)))
