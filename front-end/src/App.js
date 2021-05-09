import React from 'react'

import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

import Calendar from './screens/calendar'
import Login from './screens/login'

class App extends React.Component{
    render = () => ( 
        <BrowserRouter>
            <Switch>
                <Route path='/' render={_ => <Calendar/>} exact/>

                <Route path='/login' render={_ => <Login/>} exact/>
                <Route path='/signup' render={_ => <Redirect to='/login'/>} exact/>

                <Route path='/:base*' render={_ => <Redirect to='/'/>} exact/>
            </Switch>
        </BrowserRouter>
    )
}

export default App