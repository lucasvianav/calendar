
import React from 'react'
import { GridItem } from '@chakra-ui/layout'

const minutesInDay = 60*24

// highlights a calendar column
class CalendarTodayHighlight extends React.Component {
    // displays highlight if today is currently visible
    render = () => (this.props.sunday <= new Date() && new Date() <= this.props.saturday) ? <GridItem rowSpan={minutesInDay+1} colSpan={1} rowStart={1} colStart={new Date().getDay()+2} bg='blue.400' opacity='0.3'/> : ''
}

export default CalendarTodayHighlight