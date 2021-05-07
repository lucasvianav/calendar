import React from 'react'

import Header from '../components/header'
import CalendarWeek from '../components/calendar-week'

class Calendar extends React.Component {
    render = () => (
        <body>
            <Header/> 

            <main>
                <CalendarWeek/>
            </main>
        </body>
    )
}

export default Calendar