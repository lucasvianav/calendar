import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import { Input } from '@chakra-ui/input'
import { HStack, VStack } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Textarea } from '@chakra-ui/textarea'
import React from 'react'
import { DataContext } from '../../../../app/context'

class NewEventModal extends React.Component {
    static contextType = DataContext

    constructor(props){
        super(props)
        
        this.ref = React.createRef()

        this.state = {
            title: '', description: '',
            startDate: '', startTime: '',
            endDate: '', endTime: '',
            isTimeInvalid: false, invalidMessage: '',
            guests: []
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.reset = this.reset.bind(this)
    }
    
    reset(){
        this.setState({
            title: '', description: '',
            startDate: '', startTime: '',
            endDate: '', endTime: '',
            isTimeInvalid: false, invalidMessage: ''
        })
    }
    
    handleClose(){
        this.reset()
        this.props.onClose()
    }
    
    handleChange(e){
        const {name, value} = e.target
        
        this.setState(
            (name.includes('Date') || name.includes('Time')) 
            ? { [name]: value } 
            : { [name]: value, isTimeInvalid: false, invalidMessage: '' }
        ) 
    }
    
    async handleSubmit(e){
        e.preventDefault()

        const { title, description, startDate, startTime, endDate, endTime, guests } = this.state
        
        const start = new Date(startDate + ' ' + startTime)
        const end = new Date(endDate + ' ' + endTime)
        
        if(start > end){
            this.setState({ isTimeInvalid: true, invalidMessage: 'The event can\'t end before it starts.' })
        }
        
        else if(end - start < 5*60*1000){
            this.setState({ isTimeInvalid: true, invalidMessage: 'The event\'s minimum duration is 5 minutes.' })
        }
        
        else{
            const r = await this.context.createEvent(title, description, start, end, guests)
            
            if(r.status === 200){
                alert(`The event "${r.event.title}" was successfully created!`)
                this.handleClose()
            }

            else{
                this.setState({ isTimeInvalid: true, invalidMessage: r.message })

                // conflict
                if(r.status === 409){
                    alert( 'The event could not be created because it overlaps with the following events: \n' + r.overlaps.reduce(
                        (acc, cur) => ( 
                            acc + `\n  * ${cur.title} | ${this.context.getDate(new Date(cur.startDate), new Date(cur.endDate))}`
                        ), ''
                    ))
                }
            }
        }
    }

    render = () => (
        <Modal isOpen={this.props.isOpen} onClose={this.handleClose} id='new-event-modal' motionPreset='none' initialFocusRef={this.ref}>
            <ModalOverlay/>

            <ModalContent>
                <ModalHeader>Create new event</ModalHeader>
                <ModalCloseButton/>

                <ModalBody>
                    <VStack as='form' spacing={7} onSubmit={this.handleSubmit} id='new-event-forms'>
                        <FormControl id='title' isRequired>
                            <FormLabel>Event title:</FormLabel>
                            <Input 
                                type='text' name='title' ref={this.ref}
                                value={this.state.title} onChange={this.handleChange}
                                bg='blue.200' errorBorderColor='crimson'
                            />
                        </FormControl>

                        <FormControl isInvalid={this.state.isTimeInvalid} isRequired>
                            <FormLabel>Start:</FormLabel>
                            <HStack justify='center'>
                                <Input 
                                    type='date' name='startDate' textAlign='center'
                                    value={this.state.startDate} onChange={this.handleChange}
                                    bg='blue.200' errorBorderColor='crimson' flexShrink={1}
                                />
                                <Input 
                                    type='time' name='startTime' textAlign='center'
                                    value={this.state.startTime} onChange={this.handleChange}
                                    bg='blue.200' errorBorderColor='crimson' flexShrink={1}
                                />
                            </HStack>
                            <FormErrorMessage>{this.state.invalidMessage}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={this.state.isTimeInvalid} isRequired>
                            <FormLabel>End:</FormLabel>
                            <HStack justify='center'>
                                <Input 
                                    type='date' name='endDate' textAlign='center'
                                    value={this.state.endDate} onChange={this.handleChange}
                                    bg='blue.200' errorBorderColor='crimson' flexShrink={1}
                                />
                                <Input 
                                    type='time' name='endTime' textAlign='center'
                                    value={this.state.endTime} onChange={this.handleChange}
                                    bg='blue.200' errorBorderColor='crimson' flexShrink={1}
                                />
                            </HStack>
                            <FormErrorMessage>{this.state.invalidMessage}</FormErrorMessage>
                        </FormControl>

                        <FormControl id='description'>
                            <FormLabel>Description:</FormLabel>
                            <Textarea 
                                type='text' name='description' 
                                value={this.state.description} onChange={this.handleChange}
                                bg='blue.200' errorBorderColor='crimson'
                            />
                        </FormControl>

                        <HStack w='100%' justify='right'>
                            <Button colorScheme="blue" variant='solid' mr={3} type='submit'>Save</Button>
                            <Button colorScheme='blue' variant="outline" onClick={this.handleClose}>Cancel</Button>
                        </HStack>
                    </VStack>
                </ModalBody>

                {/* <ModalFooter/> */}
            </ModalContent>
        </Modal>
    )
}

export default NewEventModal