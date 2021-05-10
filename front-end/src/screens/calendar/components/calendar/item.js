import React from 'react'
import { GridItem, Stack, Box, Text, Heading } from '@chakra-ui/layout'
import { DataContext } from '../../../../app/context'

class CalendarItem extends React.Component {
    static contextType = DataContext
    
    constructor(props){
        super(props)

        this.state = { isModalOpen: false }

        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal(){
        this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }))
    }

    render = () => {
        const { event: e, key: k, duration, rowStart, colStart, style } = this.props
        const time = this.context.getTime(e.startDate, e.endDate)
        const title = `${e.title} ${time}`
        
        return (
            <GridItem
                as='button' key={k} onClick={this.toggleModal}
                rowSpan={duration} colSpan={1} rowStart={rowStart} colStart={colStart}
                {...style} m='0px' padding='2%' pr='4%' zIndex={1} h='100%' w='200px'
            >
                <Box
                    key={k}
                    backgroundColor="orange.500"
                    borderLeftWidth='4px' borderLeftColor='orange.600' borderRadius='0.4rem'
                    w='90%' h='100%'
                    textAlign='left' p='2%' 
                    title={title}
                >
                    <Stack
                        key={k} spacing={0}
                        direction='column' wrap='wrap'
                        justify='top' w='100%' h='100%' 
                        overflow='hidden' p='1%'
                    >
                        <Heading as='h6' size='xs' minW='0' flexShrink={1} isTruncated>{e.title}</Heading>
                        <Text fontSize='xs' minW='40%' flexShrink={0}>{time}</Text>
                    </Stack>
                </Box>
            </GridItem>
        )
    }
}

export default CalendarItem