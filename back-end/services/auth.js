const Account = require('../models/account')

const authService = {
    signup: async (name, email, googleId) => {
        if(!name || !email || !googleId){
            return { status: 400, json: { message: 'Unfortunately, your signup failed because of lack of information.' } }
        }

        const response = {}

        try{
            response.json = await Account.create({name, email, googleId})
            response.status = 200
        }

        // if an error is caught, it means that account already exists
        catch(e){
            // logs error
            console.log(e)

            response.json = { message: 'The signup failed because this account already exists.' }
            response.status = 403
        }
        
        return response
    }
}

module.exports = authService