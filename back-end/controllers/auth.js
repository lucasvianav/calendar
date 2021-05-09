const authService = require('../services/auth')

const authController = {
    signup: async (req, res) => {
        const {name, email, password} = req.body
        const r = await authService.signup(name, email, password)

        return res.status(r.status).json(r.json)
    },

    signin: async (req, res) => {
        const {password} = req.body
        const r = await authService.signin(password)

        return res.status(r.status).json(r.json)
    }
}

module.exports = authController