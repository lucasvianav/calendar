import { Button } from '@chakra-ui/button'
import { BsPlusCircleFill } from 'react-icons/bs'
import React from 'react'
import NewEventModal from './calendar-new-event-modal'
import $ from 'jquery'

class NewEventButton extends React.Component {
    constructor(props){
        super(props)

        this.state = { isModalOpen: false }
        
        this.toggleModal = this.toggleModal.bind(this)
    }
    
    toggleModal(){
        this.setState(
            prevState => ({ isModalOpen: !prevState.isModalOpen }), 
            () => $('#chakra-modal-new-event-modal').css('opacity', this.state.isModalOpen ? '1' : '0')
        )
    }

    render = () => (
        <>
            <Button {...this.props.style} onClick={this.toggleModal} variant='ghost'><BsPlusCircleFill fontSize='35px'/></Button>
            <NewEventModal isOpen={this.state.isModalOpen} onClose={this.toggleModal} refresh={this.props.refresh}/>
        </>
    )
}

export default NewEventButton