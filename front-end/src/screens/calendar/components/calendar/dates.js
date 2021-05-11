import React from 'react'
import { GridItem, Heading } from '@chakra-ui/layout'

const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

class CalendarDates extends React.Component {
    render = () => (
        <>
            {
                weekdays.map((day, i) => (
                    <GridItem key={day + i} rowSpan={1} colSpan={1} rowStart={1} colStart={i%7+2} py='10%' zIndex={1}>
                        <Heading key={day + i + 1} as='h6' size='xs' color='gray.500' textAlign='center'>
                            {day} {i === 0 ? `(${this.props.monthSunday})` : ''} {i === 6 ? `(${this.props.monthSaturday})` : ''}
                        </Heading>
                        <Heading key={day + i + 2} as='h3' size='lg' color='gray.600' textAlign='center'>{this.props.sunday.getDate()+i}</Heading>
                    </GridItem>
                ))
            }
        </>
    )
}

export default CalendarDates