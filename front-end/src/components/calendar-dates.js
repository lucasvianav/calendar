import React from 'react'
import { GridItem, Heading } from '@chakra-ui/layout'

const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

class CalendarDates extends React.Component {
    render = () => (
        <>
            {
                weekdays.map((day, i) => (
                    <GridItem rowSpan={1} colSpan={1} rowStart={1} colStart={i%7+2} m='0px' mb='7px' bg="" py='10%' zIndex={1}>
                        <Heading as='h6' size='xs' color='gray.600' textAlign='center'>{day}</Heading>
                        <Heading as='h3' size='lg' color='gray.700' textAlign='center'>{this.props.sunday.getDate()+i}</Heading>
                    </GridItem>
                ))
            }
        </>
    )
}

export default CalendarDates