import React from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'

class NewEventModal extends React.Component {
    render = () => (
        <Modal isOpen={this.props.isOpen} onClose={this.props.onClose} id='new-event-modal' colorScheme='blue'>
            <ModalOverlay/>

            <ModalContent>
                <ModalHeader>Create new event</ModalHeader>
                <ModalCloseButton/>

                <ModalBody>
                    <Text>falamalandrio</Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={''}>Save</Button>
                    <Button variant="ghost" onClick={this.props.onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default NewEventModal