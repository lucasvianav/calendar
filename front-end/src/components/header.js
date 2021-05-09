import { Flex } from '@chakra-ui/layout'
import React from 'react'
import Logo from './logo'
import MenuPanel from './menu-panel'

class Header extends React.Component {
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
            <Logo type='png' width='30%'/>
            <MenuPanel {...this.props}/>
        </Flex>
    )
}

export default Header