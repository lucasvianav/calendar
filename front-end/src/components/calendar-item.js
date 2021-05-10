import React from 'react'
import { GridItem, Stack, Box, Text, Heading } from '@chakra-ui/layout'

const getTime = date => date.toString().replace(/.+?(\d{2}:\d{2}).+/,'$1')

class CalendarItem extends React.Component {
    render = () => {
        const { event: e, key, duration, rowStart, colStart, style } = this.props
        const time = `${getTime(e.startDate)} - ${getTime(e.endDate)}`
        const title = `${e.title} ${time}`
        
        return (
            <GridItem key={key} rowSpan={duration} colSpan={1} rowStart={rowStart} colStart={colStart} {...style} m='0px' padding='2%' pr='4%' zIndex={1} h='100%' w='200px'>
                <Box
                    key={key}
                    backgroundColor="orange.500"
                    borderLeftWidth='4px' borderLeftColor='orange.600' borderRadius='0.4rem'
                    w='90%' h='100%'
                    textAlign='left' p='2%' 
                    title={title}
                >
                    <Stack
                        key={key}
                        direction='column' wrap='wrap' spacing='0'
                        justify='top' w='100%' h='100%' 
                        overflow='hidden' p='1%'
                    >
                        <Heading as='h6' size='xs' minW='0%' maxW='100%' flexShrink={1} isTruncated>{e.title}</Heading>
                        <Text fontSize='xs' minW='40%' flexShrink={0}>{time}</Text>
                    </Stack>
                </Box>
            </GridItem>
        )
    }
}

export default CalendarItem