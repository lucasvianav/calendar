
import React from 'react'
import { GridItem } from '@chakra-ui/layout'

const minutesInDay = 60*24

// highlights a calendar column
class CalendarTodayHighlight extends React.Component {
    render = () => <GridItem rowSpan={minutesInDay+1} colSpan={1} rowStart={1} colStart={new Date().getDay()+2} bg='blue.400' opacity='0.3'/>
}

export default CalendarTodayHighlight