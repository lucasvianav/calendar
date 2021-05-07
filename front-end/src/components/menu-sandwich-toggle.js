import { HiMenu } from 'react-icons/hi'
import { MdClose } from 'react-icons/md'
import React from 'react'
import { Button } from '@chakra-ui/button'

class MenuSandwichToggle extends React.Component {
    render = () => (
        <Button variant='ghost' display={{base: 'block', md: 'none'}} onClick={this.props.toggle}>
            { this.props.isOpen ? <MdClose/> : <HiMenu/> }
        </Button>
    )
}

export default MenuSandwichToggle