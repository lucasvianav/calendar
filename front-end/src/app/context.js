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
        this.createEvent = this.createEvent.bind(this)
        this.getTime = this.getTime.bind(this)
        this.getDate = this.getDate.bind(this)
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
    
    async createEvent(title, description, startDate, endDate, guests){
        const r = (await api.post(`/events/${this.state._id}`, { title, description, startDate, endDate, guests })).data
        
        if(r.status === 200){
            // this.setState(prevState => ( { events: [ ...prevState.events.map(e => ({...e})), r.event ] }))

            // this.setState(prevState => (
            //     { events: [
            //         ...prevState.events.map(e => ({
            //             title: e.title,
            //             description: e.description,
            //             _id: e._id,
            //             creator: e.creator,
            //             guests: [...e.guests.map(g => ({...g}))],
            //             startDate: new Date(e.startDate),
            //             endDate: new Date(e.endDate)
            //         })), r.event 
            //     ] }
            // ))

            await this.fetchEvents()
        }
        
        else if(r.status === 401){
            this.signout()
        }
        
        return r
    }
    
    getTime(startDate, endDate){
        const formatTime = date => new Date(date).toString().replace(/.+?(\d{2}:\d{2}).+/,'$1')
        return `${formatTime(startDate)} - ${formatTime(endDate)}`
    } 
    
    getDate(startDate, endDate){
        // formats time as: DAY (dd/mm) XX:YY
        const formatTime = date => date.toString().replace(
            /^(\S{3}).+?(\d{2}).+?(\d{2}:\d{2}).+/,
            `$1 ($2/${String(date.getMonth()+1).padStart(2,0)}) $3`
        )

        return `${formatTime(startDate)} - ${formatTime(endDate)}`
    }

    render = () => {
        const { name, email, events } = this.state
        const { signin, signup, signout, validatePw, fetchEvents, fetchUser, hasUserData, fetchAllData, createEvent, getTime, getDate } = this

        return(
            <DataContext.Provider value={{ name, email, events, signin, signup, signout, validatePw, fetchEvents, fetchUser, hasUserData, fetchAllData, createEvent, getTime, getDate }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}
