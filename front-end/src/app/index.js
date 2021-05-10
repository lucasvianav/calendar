import React from 'react'

import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

import Calendar from '../screens/calendar/index'
import Auth from '../screens/auth/index'
import { DataProvider } from './context'

class App extends React.Component{
    render = () => ( 
        <DataProvider><BrowserRouter>
            <Switch>
                <Route path='/' render={props => <Calendar {...props}/>} exact/>

                <Route path='/login' render={props => <Auth {...props} type='signin'/>} exact/>
                <Route path='/signup' render={props => <Auth {...props} type='signup'/>} exact/>

                <Route path='/:base*' render={props => <Redirect {...props} to='/'/>} exact/>
            </Switch>
        </BrowserRouter></DataProvider>
    )
}

export default App