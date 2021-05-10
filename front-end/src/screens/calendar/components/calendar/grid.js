import React from 'react'
import { GridItem } from '@chakra-ui/layout'

class CalendarGrid extends React.Component {
    render = () => (
        <>
        {
            Array.from({length: 24*7}, (_, i) => (
                <GridItem 
                    rowSpan={60} colSpan={1} key={i + Math.random()}
                    rowStart={parseInt(i/7)*60+2} colStart={i%7+2} 
                    borderX='1px' borderY='1px' borderColor='gray.300' 
                    m='0px' padding='1%' w='220px'
                />
            ))
        }
        </>
    )
}

export default CalendarGrid