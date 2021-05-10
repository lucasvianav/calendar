import React from 'react'
import api from './connection'

export const DataContext = React.createContext()

export class DataProvider extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            name: '',
            email: '',
            _id: '',
            events: []
        }
        
        this.signin = this.signin.bind(this)
        this.signup = this.signup.bind(this)
        this.validatePw = this.validatePw.bind(this)
        this.signout = this.signout.bind(this)
        this.fetchEvents = this.fetchEvents.bind(this)
        this.fetchUser = this.fetchUser.bind(this)
        this.hasUserData = this.hasUserData.bind(this)
        this.fetchAllData = this.fetchAllData.bind(this)
    }
    
    async signin(email, password){
        const r = (await api.post('/auth/signin', { email, password })).data
        
        if(r.status === 200){
            const { name, email, _id } = r
            this.setState({ name, email, _id })
            localStorage.setItem('jwt', JSON.stringify(r.jwt))
        }
        
        return r
    }
    
    async signup(name, email, password){
        const r = (await api.post('/auth/signup', { name, email, password })).data

        if(r.status === 200){
            const { name, email, _id } = r
            this.setState({ name, email, _id })
        }

        return r
    }
    
    signout(){
        localStorage.removeItem('jwt')
        this.setState({name: '', email: '', events: []})
    }

    async fetchEvents(){
        const r = (await api.get(`/events/${this.state._id}`)).data
        
        if(r.status === 200 || r.status === 404){
            this.setState({events: r.events.map(e => {
                e.startDate = new Date(e.startDate)
                e.endDate = new Date(e.endDate)
                return e
            })})
        }
        
        else if(r.status === 401){
            this.signout()
        }

        return r
    }

    async fetchUser(){
        JSON.parse(localStorage.getItem('jwt'))

        const r = (await api.get('/auth/')).data
        
        if(r.status === 200){
            const { name, email, _id } = r
            this.setState({ name, email, _id })
        }

        else if(r.status === 401){
            this.signout()
        }
        
        return r
    }
    
    async fetchAllData(){
        const r_user = await this.fetchUser()
        return r_user.status === 200 ? await this.fetchEvents() : r_user
    }
    
    hasUserData(){
        return Boolean(this.state.name && this.state.email && this.state._id)
    }

    validatePw(pw){
        /** Password Regex Explanation
            * (?=\S*?[0-9]) - a digit must occur at least once
            * (?=\S*?[a-z]) - a lower case letter must occur at least once
            * (?=\S*?[A-Z]) - an upper case letter must occur at least once
            * \S{8,} - at least 8 characters
            * \S - no whitespace allowed
            */
            let pwRegex = RegExp("(?=\\S*?[0-9])(?=\\S*?[a-z])(?=\\S*?[A-Z])\\S{8,}")

        return !(pw.includes(' ') || !pwRegex.test(pw))
    }

    render = () => {
        const { name, email, events } = this.state
        const { signin, signup, signout, validatePw, fetchEvents, fetchUser, hasUserData, fetchAllData } = this

        return(
            <DataContext.Provider value={{ name, email, events, signin, signup, signout, validatePw, fetchEvents, fetchUser, hasUserData, fetchAllData }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}
