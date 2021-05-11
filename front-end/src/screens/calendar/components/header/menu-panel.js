import { Box, Heading, Stack, VStack } from '@chakra-ui/layout'
import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { DataContext } from '../../../../app/context'
import { Button } from '@chakra-ui/button'

class MenuPanel extends React.Component {
    static contextType = DataContext
    
    constructor(props){
        super(props)

        this.signout = this.signout.bind(this)
    }

    signout(){
        this.context.signout()
        this.props.history.push('/login')
    }

    render = () => (
        <Box>
            <Stack 
                direction={['column', 'row', 'row', 'row']} spacing='8' align='center' p={[4, 4, 0, 0]}
                justify={['center', 'space-between', 'flex-end', 'flex-end']} display={{ base: 'none', md: 'flex' }}
            >
                <VStack spacing='1%' textAlign='right' userSelect='none'>
                    <Heading as='h4' size='md'>{this.context.name}</Heading>
                    <Heading as='h6' size='xs'>{this.context.email}</Heading>
                </VStack>
            
                <Button onClick={this.signout} variant='ghost'> <FiLogOut/> </Button>
            </Stack>

            <Button onClick={this.signout} variant='ghost' display={{ base: 'block', md: 'none' }}> <FiLogOut/> </Button>
        </Box>
    )
}

export default MenuPanel