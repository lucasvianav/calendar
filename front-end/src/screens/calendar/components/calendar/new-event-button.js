import { Button } from '@chakra-ui/button'
import React from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'
import EventFormsModal from './event-forms-modal'

class NewEventButton extends React.Component {
    constructor(props){
        super(props)

        this.state = { isModalOpen: false }
        
        this.toggleModal = this.toggleModal.bind(this)
    }
    
    toggleModal(){
        this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }))
    }

    render = () => (
        <>
            <Button {...this.props.style} onClick={this.toggleModal} variant='ghost'><BsPlusCircleFill fontSize='35px'/></Button>
            <EventFormsModal isOpen={this.state.isModalOpen} onClose={this.toggleModal} create/>
        </>
    )
}

export default NewEventButton