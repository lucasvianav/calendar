import { Flex, Grid } from '@chakra-ui/layout'
import React from 'react'
import CalendarDates from './calendar-dates'
import CalendarEvent from './calendar-event'
import CalendarGrid from './calendar-grid'
import CalendarTimes from './calendar-times'
import CalendarTodayHighlight from './calendar-today-highlight'

const minutesInDay = 60*24

class CalendarWeek extends React.Component {
    constructor(props){
        super(props)

        const sunday = new Date()
        while(sunday.getDay() > 0){ sunday.setDate(sunday.getDate()-1) }

        this.state = { sunday }
    }

    render = () => (
        <Flex as='main' justify='center' mr='9%' my='2%'>
            <Grid templateRows={`repeat(${minutesInDay+1}, 1fr)`} templateColumns='repeat(8, 1fr)' p={[0, 2, 0, 2]} w='100%' h='1650px' gap={0}>
                {/* sets up calendar grid (borders) */}
                <CalendarGrid/>

                <CalendarTodayHighlight/>

                {/* sets up calendar times */}
                <CalendarTimes/>

                {/* sets up calendar dates */}
                <CalendarDates sunday={this.state.sunday}/>
        
                {/* <CalendarEvent startDate={'2021-05-04 10:19'} endDate={'2021-05-04 10:24'}/> */}
            </Grid>
        </Flex>
    )
}

export default CalendarWeek