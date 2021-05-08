import React from 'react'
import { GridItem, Stack, Flex, Box, Text, Heading } from '@chakra-ui/layout'

class CalendarItem extends React.Component {
    render = () => (
        <GridItem rowSpan={this.props.duration} colSpan={1} rowStart={this.props.rowStart} colStart={this.props.colStart} {...this.props.style} m='0px' padding='2%' pr='4%' zIndex={1} h='100%' w='200px'>
            <Box
                backgroundColor="orange.500"
                borderLeftWidth='4px' borderLeftColor='orange.600' borderRadius='0.4rem'
                w='90%' h='100%'
                textAlign='left' p='2%' 
                title='Event title aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa 10:15 - 11:37'
            >
                <Stack
                    direction='column' wrap='wrap' spacing='0'
                    justify='top' w='100%' h='100%' 
                    overflow='hidden' p='1%'
                >
                    <Heading as='h6' size='xs' minW='0%' maxW='100%' flexShrink={1} isTruncated>Event title aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Heading>
                    <Text fontSize='xs' minW='40%' flexShrink={0}>10:15 - 11:37</Text>
                </Stack>
            </Box>
        </GridItem>
    )
}

export default CalendarItem