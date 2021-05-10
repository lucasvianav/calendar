import React from 'react'
import { GridItem, Text } from '@chakra-ui/layout'

class CalendarTimes extends React.Component {
    render = () => (
        <>
            {
                Array.from({length: 23}, (_, i) => (
                    <GridItem key={i + Math.random()} rowSpan={60} colSpan={1} rowStart={(i+1)*60} colStart={1} m='0' mr='7%'>
                        <Text key={i + Math.random()} textAlign='right' fontSize='6pt' color='grey' w='100%' h='100%' m='0' p='0'>
                            {i < 12 ? (i+1).toString() + ' AM' : (i-11).toString() + ' PM'}
                        </Text>
                    </GridItem>
                ))
            }
        </>
    )
}

export default CalendarTimes