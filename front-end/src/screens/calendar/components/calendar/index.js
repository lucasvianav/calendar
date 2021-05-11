import { Flex, Grid, Heading } from '@chakra-ui/layout'
import React from 'react'
import { DataContext } from '../../../../app/context'
import CalendarDates from './dates'
import CalendarEvent from './event'
import CalendarGrid from './grid'
import CalendarTimes from './times'
import CalendarTodayHighlight from './today-highlight'
import WeekControls from './week-controls'
import { Button } from '@chakra-ui/button'
import NewEventButton from './new-event-button'

const minutesInDay = 60*24

class CalendarWeek extends React.Component {
    static contextType = DataContext

    constructor(props){
        super(props)

        const sunday = new Date()
        while(sunday.getDay() > 0){ sunday.setDate(sunday.getDate()-1) }
        sunday.setHours(0, 0, 0, 0)
        
        const saturday = new Date(sunday)
        saturday.setDate(saturday.getDate() + 6)
        saturday.setHours(23, 59, 59, 999)
        
        const monthSunday = sunday.toString().replace(/^\S{3}\s(\S{3}).+?(\d{4}).+$/, '$1 $2')
        const monthSaturday = saturday.toString().replace(/^\S{3}\s(\S{3}).+?(\d{4}).+$/, '$1 $2')

        this.state = { 
            sunday, saturday, 
            todaySunday: new Date(sunday), todaySaturday: new Date(saturday), 
            monthSunday, monthSaturday,
            todayMonthSunday: monthSunday, todayMonthSaturday: monthSaturday
        }
        
        this.nextWeek = this.nextWeek.bind(this)
        this.pastWeek = this.pastWeek.bind(this)
        this.today = this.today.bind(this)
    }
    
    nextWeek(){
        this.setState(prevState => {
            const sunday = new Date(prevState.sunday)
            sunday.setDate(sunday.getDate() + 7)
            
            const saturday = new Date(prevState.saturday)
            saturday.setDate(saturday.getDate() + 7)

            const monthSunday = sunday.toString().replace(/^\S{3}\s(\S{3}).+?(\d{4}).+$/, '$1 $2')
            const monthSaturday = saturday.toString().replace(/^\S{3}\s(\S{3}).+?(\d{4}).+$/, '$1 $2')
            
            return { sunday, saturday, monthSunday, monthSaturday }
        })
    }

    pastWeek(){
        this.setState(prevState => {
            const sunday = new Date(prevState.sunday)
            sunday.setDate(sunday.getDate() - 7)
            
            const saturday = new Date(prevState.saturday)
            saturday.setDate(saturday.getDate() - 7)

            const monthSunday = sunday.toString().replace(/^\S{3}\s(\S{3}).+?(\d{4}).+$/, '$1 $2')
            const monthSaturday = saturday.toString().replace(/^\S{3}\s(\S{3}).+?(\d{4}).+$/, '$1 $2')

            return { sunday, saturday, monthSunday, monthSaturday }
        })
    }
    
    today(){
        this.setState(prevState => ({ 
            sunday: prevState.todaySunday, saturday: prevState.todaySaturday,
            monthSunday: prevState.todayMonthSunday, monthSaturday: prevState.todayMonthSaturday
        }))
    }

    render = () => (
        <Flex as='main' justify='center' mr='9%' my='2%'>
            <WeekControls style={{position: 'absolute', right: {base: '27%', md: '12%'}}} nextWeek={this.nextWeek} pastWeek={this.pastWeek}/>
        
            <Button position='absolute' right='5%' onClick={this.today} variant='solid'>Today</Button>
        
            <NewEventButton style={{position:'fixed', right:'3%', bottom:'5%', colorScheme:'blue'}}/>

            <Grid
                templateRows={`repeat(${minutesInDay+1}, 1fr)`} templateColumns='repeat(8, 1fr)'
                p={[0, 2, 0, 2]} mt={{base: '15%', md: '3%'}} w='100%' h={{base: '1800px', xl: '1250px'}} gap={0}
            >
                {/* sets up calendar grid (borders) */}
                <CalendarGrid/>

                {/* if today is visible, highlight it */}
                <CalendarTodayHighlight {...this.state}/>

                {/* sets up calendar times */}
                <CalendarTimes/>

                {/* sets up calendar dates */}
                <CalendarDates sunday={this.state.sunday} monthSunday={this.state.monthSunday} monthSaturday={this.state.monthSaturday}/>
        
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