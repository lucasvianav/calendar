const mongoose = require('mongoose')
const accountSchema = require('./schemas/account')

const Account = mongoose.model('Account', accountSchema)

module.exports = Account