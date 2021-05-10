import React from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Text, VStack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Textarea } from '@chakra-ui/textarea'

class NewEventModal extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            title: ''
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(e){
        
    }
    
    handleSubmit(e){

    }

    render = () => (
        <Modal isOpen={this.props.isOpen} onClose={this.props.onClose} id='new-event-modal' motionPreset='none'>
            <ModalOverlay/>

            <ModalContent>
                <ModalHeader>Create new event</ModalHeader>
                <ModalCloseButton/>

                <ModalBody>
                    <VStack as='form' spacing={7} onSubmit={this.handleSubmit}>
                        <FormControl id='title' isRequired>
                            <FormLabel>Event title:</FormLabel>
                            <Input 
                                type='text' name='title' 
                                value={this.state.title} onChange={this.handleChange}
                                bg='blue.200' errorBorderColor='crimson'
                            />
                        </FormControl>

                        <FormControl id='title' isRequired>
                            <FormLabel>Event title:</FormLabel>
                            <Input 
                                type='text' name='title' 
                                value={this.state.title} onChange={this.handleChange}
                                bg='blue.200' errorBorderColor='crimson'
                            />
                        </FormControl>

                        <FormControl id='description'>
                            <FormLabel>Description:</FormLabel>
                            <Textarea 
                                type='text' name='description' 
                                value={this.state.description} onChange={this.handleChange}
                                bg='blue.200' errorBorderColor='crimson'
                            />
                        </FormControl>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={this.handleSubmit}>Save</Button>
                    <Button variant="ghost" onClick={this.props.onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default NewEventModal