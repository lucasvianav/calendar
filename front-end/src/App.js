import React from 'react'

import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

import Calendar from './screens/calendar'

class App extends React.Component{
    render = () => ( 
        <BrowserRouter>
            <Switch>
                <Route path='/' render={props => <Calendar/>} exact/>
            </Switch>
        </BrowserRouter>
    )
}

export default App