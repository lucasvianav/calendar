import { Box, Flex, Grid, GridItem, Text, Heading } from '@chakra-ui/layout'
import React from 'react'

const minutesInDay = 60*24
const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

class CalendarWeek extends React.Component {
    render = () => (
        <Flex justify='center'>
            <Grid templateRows={`repeat(${minutesInDay+1}, 1fr)`} templateColumns='repeat(8, 1fr)' p={[0, 2, 0, 2]} w='95%' h='1111px' gap={0}>
                {
                    Array.from({length: 23}, (_, i) => (
                        <GridItem rowSpan={60} colSpan={1} rowStart={i*60+3} colStart={1} w='15%' bg='pink.300' mr='0px'>
                            <Text textAlign='right' fontSize='6pt' color='grey' w='100%' h='100%'>
                                {i < 12 ? (i+1).toString() + ' AM' : (i-11).toString() + ' PM'}
                            </Text>
                        </GridItem>
                    ))
                }

                {
                    weekdays.map((day, i) => (
                        <GridItem rowSpan={1} colSpan={1} rowStart={1} colStart={i%7+2} m='0px' mb='7px' bg="">
                            <Heading as='h6' size='xs' color='gray.600' textAlign='center'>{day}</Heading>
                            <Heading as='h3' size='lg' color='gray.700' textAlign='center'>{i+1}</Heading>
                        </GridItem>
                    ))
                }

                {
                    Array.from({length: 24*7}, (_, i) => (
                        <GridItem rowSpan={60} colSpan={1} rowStart={parseInt(i/7)*60+2} colStart={i%7+2} m='0px' borderX='1px' borderY='1px' borderColor='gray.300' padding='5%' textAlign='center'>
                            <Text backgroundColor="orange.500" w='100%' h='100%'>
                                oi
                            </Text>
                        </GridItem>
                    ))
                }
            </Grid>
        </Flex>
    )
}

export default CalendarWeek