import { Flex } from '@chakra-ui/layout'
import React from 'react'
import Logo from './logo'
import MenuPanel from './menu-panel'

class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = { isOpen: false }
    }
    
    toggleMenu = () => this.setState(prevState => ({isOpen: !prevState.isOpen}))

    render = () => (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            mb={3}
            p={4}
            bg='blue.400'
            // color={["white", "white", "primary.700", "primary.700"]}
            {...this.props}
        >
            <Logo width='30%'/>
            <MenuPanel toggle={this.toggleMenu} isOpen={this.state.isOpen}/>
        </Flex>
    )
}

export default Header