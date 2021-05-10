import { Button } from '@chakra-ui/button'
import { BsPlusCircleFill } from 'react-icons/bs'
import React from 'react'

class NewEventButton extends React.Component {
    render = () => (
        <Button {...this.props.style} variant='ghost'><BsPlusCircleFill fontSize='35px'/></Button>
    )
}

export default NewEventButton