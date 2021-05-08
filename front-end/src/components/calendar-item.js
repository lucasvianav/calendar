import React from 'react'
import { GridItem, Text } from '@chakra-ui/layout'

class CalendarItem extends React.Component {
    render = () => (
        <GridItem rowSpan={this.props.duration} colSpan={1} rowStart={this.props.rowStart} colStart={this.props.colStart} {...this.props.style} m='0px' padding='2%' pr='4%' zIndex={1}>
            <Text 
                backgroundColor="orange.500" 
                borderLeftWidth='4px' borderLeftColor='orange.600' borderRadius='0.4rem' 
                w='100%' h='100%'
                textAlign='left' p='4%'
            >
                oi
            </Text>
        </GridItem>
    )
}

export default CalendarItem