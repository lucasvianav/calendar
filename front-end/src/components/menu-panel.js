import { Box, Stack, VStack } from '@chakra-ui/layout'
import React from 'react'
import MenuItem from './menu-item'
import SandwichMenuToggle from './menu-sandwich-toggle'
import { FiLogOut } from 'react-icons/fi'

class MenuPanel extends React.Component {
    render = () => (
        <Box display={{ base: this.props.isOpen ? 'block' : 'none', md: 'block' }}>
            <Stack 
                direction={['column', 'row', 'row', 'row']} 
                spacing='8' 
                align='center' 
                justify={['center', 'space-between', 'flex-end', 'flex-end']}
                p={[4, 4, 0, 0]}
            >
                <VStack spacing='1%' textAlign='right'>
                    <MenuItem>Lucas Viana Vilela</MenuItem>
                    <MenuItem>oviana@outlook.com</MenuItem>
                </VStack>
            
                <MenuItem link><FiLogOut/></MenuItem>
            </Stack>
        </Box>
    )
}

export default MenuPanel