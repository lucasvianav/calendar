const Account = require('../models/account')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getJWT = (_id) => jwt.sign({ _id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '12h' })

const authService = {
    authenticate: async (token) => {
        try {
            const { _id } = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
            return { status: 200, _id }
        } 

        catch (e) {
            return { status: 401, message: 'You must be logged in to see this content.' }
        }
    },
    
    find: async(token) => {
        try {
            const { _id } = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
            const user = await Account.findById(_id)
            
            if(!user){ throw new Error('User not found.') }
            
            return { name: user.name, email: user.email,_id: user._id, status: 200 }
        } 

        catch (e) {
            return { status: 401, message: 'An error occurred.' }
        }
    },

    signup: async (name, email, password) => {
        // if any information is missing
        if(!name || !email || !password){
            return { message: 'Unfortunately, your signup failed because of lack of information.', status: 400 }
        }

        // hashes the password
        password = await bcrypt.hash(password, 10)  

        // tries and creates the account
        try{
            const user = await Account.create({name, email, password})
            return { name: user.name, email: user.email, _id: user._id, jwt: getJWT(user._id), status: 200 }
        }

        // if an error is caught, it means that account already exists
        catch(e){
            // logs error
            console.log(e)

            return { message: 'The signup failed because this account already exists.', status: 403 }
        }
    },

    signin: async (email, password) => {
        const user = await Account.findOne({email})
        
        if(!user){
            return { message: 'This account doesn\'t exist.', status: 404 }
        }
        
        // checks if the password is equivalent to the stored hash
        else if(!await bcrypt.compare(password, user.password)){
            return { message: 'The password is incorrect.', status: 401 }
        }
        
        else{
            return { name: user.name, email: user.email,_id: user._id, jwt: getJWT(user._id), status: 200 }
        }
        
    }
}

module.exports = authService