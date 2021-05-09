const authService = require('../services/auth')

const authController = {
    authenticate: async (req, res, next) => {
        const jwt = req.headers.authorization.replace(/^Bearer\s/, '')
        const r = authService.authenticate(jwt)

        if(r.status === 200){ next() }
        
        else{ return res.status(200).json(r) }
    },
    
    find: async(req, res) => {
        const jwt = req.headers.authorization.replace(/^Bearer\s/, '')
        const r = await authService.find(jwt)
        
        return res.status(200).json(r)
    },

    signup: async (req, res) => {
        const { name, email, password } = req.body
        const r = await authService.signup(name, email, password)

        return res.status(200).json(r)
    },

    signin: async (req, res) => {
        const { email, password } = req.body
        const r = await authService.signin(email, password)

        return res.status(200).json(r)
    }
}

module.exports = authController