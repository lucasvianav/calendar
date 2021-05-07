import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/layout'
import React from 'react'

const minutesInDay = 60*24

class CalendarWeek extends React.Component {
    render = () => (
        <Flex>
            <Grid templateRows={`repeat(24, 1fr)`} templateColumns='repeat(1, 1fr)' p={[0, 2, 0, 2]} w='8%' h='1080px' gap={0} zIndex='2'>
                <GridItem rowSpan={1} colSpan={1}/>
                <GridItem rowSpan={1} colSpan={1}/>
                {
                    Array.from({length: 23}, (_, i) => 
                        <GridItem rowSpan={1} colSpan={1}>
                            <Text textAlign='right' fontSize='7pt' color='grey'>{i < 12 ? (i+1).toString() + ' AM' : (i-11).toString() + ' PM'}</Text>
                        </GridItem>
                    )
                }
                <GridItem rowSpan={1} colSpan={1} border='2px' borderColor='orange.50'/>
            </Grid>

            <Grid templateRows={`repeat(${minutesInDay}, 1fr)`} templateColumns='repeat(7, 1fr)' p={[0, 2, 0, 2]} w='90%' h='1080px' gap={0} zIndex='2'>
                <GridItem rowSpan={60} colSpan={1} mb='7px'></GridItem>
                <GridItem rowSpan={60} colSpan={1} mb='7px'></GridItem>
                <GridItem rowSpan={60} colSpan={1} mb='7px'></GridItem>
                <GridItem rowSpan={60} colSpan={1} mb='7px'></GridItem>
                <GridItem rowSpan={60} colSpan={1} mb='7px'></GridItem>
                <GridItem rowSpan={60} colSpan={1} mb='7px'></GridItem>
                <GridItem rowSpan={60} colSpan={1} mb='7px'></GridItem>

                {Array.from({length: 24*7}, () => <GridItem rowSpan={60} colSpan={1} bg='orange.400' p='0' borderRadius='7' marginX='4px' marginY='4px'><Flex justify='center' align='center' m='0'>oi</Flex></GridItem>)}
            </Grid>

            <Grid templateRows={`repeat(24, 1fr)`} templateColumns='repeat(7, 1fr)' p={[0, 2, 0, 2]} w='90%' h='1080px' gap={0} position='absolute' zIndex='1' left='8%'>
                <GridItem rowSpan={1} colSpan={1} mb='7px' bg=""><Text textAlign='center'>Dom</Text></GridItem>
                <GridItem rowSpan={1} colSpan={1} mb='7px' bg=""><Text textAlign='center'>Seg</Text></GridItem>
                <GridItem rowSpan={1} colSpan={1} mb='7px' bg=""><Text textAlign='center'>Ter</Text></GridItem>
                <GridItem rowSpan={1} colSpan={1} mb='7px' bg=""><Text textAlign='center'>Qua</Text></GridItem>
                <GridItem rowSpan={1} colSpan={1} mb='7px' bg=""><Text textAlign='center'>Qui</Text></GridItem>
                <GridItem rowSpan={1} colSpan={1} mb='7px' bg=""><Text textAlign='center'>Sex</Text></GridItem>
                <GridItem rowSpan={1} colSpan={1} mb='7px' bg=""><Text textAlign='center'>Sáb</Text></GridItem>

                {Array.from({length: 24*7}, () => <GridItem rowSpan={1} colSpan={1} borderX='1px' borderY='1px' borderColor='orange.100' bg="white"/>)}
            </Grid>
        </Flex>
    )
}

export default CalendarWeek