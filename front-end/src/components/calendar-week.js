import { Flex, Grid } from '@chakra-ui/layout'
import React from 'react'
import { DataContext } from '../app/context'
import CalendarDates from './calendar-dates'
import CalendarEvent from './calendar-event'
import CalendarGrid from './calendar-grid'
import CalendarTimes from './calendar-times'
import CalendarTodayHighlight from './calendar-today-highlight'
import WeekControls from './calendar-week-controls'
import { Button } from '@chakra-ui/button'
import NewEventButton from './calendar-new-event-button'

const minutesInDay = 60*24

class CalendarWeek extends React.Component {
    static contextType = DataContext

    constructor(props){
        super(props)

        const sunday = new Date()
        while(sunday.getDay() > 0){ sunday.setDate(sunday.getDate()-1) }
        
        const saturday = new Date(sunday)
        saturday.setDate(saturday.getDate() + 6)

        this.state = { sunday, saturday }
        
        this.nextWeek = this.nextWeek.bind(this)
        this.pastWeek = this.pastWeek.bind(this)
    }
    
    nextWeek(){
        this.setState(prevState => {
            const sunday = new Date(prevState.sunday)
            sunday.setDate(sunday.getDate() + 7)
            
            const saturday = new Date(prevState.saturday)
            saturday.setDate(saturday.getDate() + 7)
            
            return { sunday, saturday }
        })
    }

    pastWeek(){
        this.setState(prevState => {
            const sunday = new Date(prevState.sunday)
            sunday.setDate(sunday.getDate() - 7)
            
            const saturday = new Date(prevState.saturday)
            saturday.setDate(saturday.getDate() - 7)
            
            return { sunday, saturday }
        })
    }

    render = () => (
        <Flex as='main' justify='center' mr='9%' my='2%'>
            <WeekControls style={{position: 'absolute', left: '5%'}} nextWeek={this.nextWeek} pastWeek={this.pastWeek}/>
        
            <NewEventButton style={{position:'fixed', right:'3%', bottom:'5%', colorScheme:'blue'}}/>

            <Grid templateRows={`repeat(${minutesInDay+1}, 1fr)`} templateColumns='repeat(8, 1fr)' p={[0, 2, 0, 2]} mt='3%' w='100%' h='1650px' gap={0}>
                {/* sets up calendar grid (borders) */}
                <CalendarGrid/>

                {/* if today is visible, highlight it */}
                <CalendarTodayHighlight {...this.state}/>

                {/* sets up calendar times */}
                <CalendarTimes/>

                {/* sets up calendar dates */}
                <CalendarDates sunday={this.state.sunday}/>
        
                {
                    this.context.events
                        .filter(e => (
                            (this.state.sunday <= e.startDate && e.startDate <= this.state.saturday) || 
                            (this.state.sunday <= e.endDate && e.endDate <= this.state.saturday)
                        ))
                        .map(e => <CalendarEvent key={e._id} eventObj={e}/>)
                }
            </Grid>
        </Flex>
    )
}

export default CalendarWeek