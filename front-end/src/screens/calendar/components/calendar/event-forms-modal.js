import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { HStack, Text, VStack } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/textarea'
import React from 'react'
import { DataContext } from '../../../../app/context'

class EventFormsModal extends React.Component {
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
        this.handleDelete = this.handleDelete.bind(this)
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
    
    async handleDelete(){
        const {title, _id} = this.props.event
        
        const proceed = window.confirm(`Are you sure you want to delete the event "${title}"? This action can't be undone.`)
        if(!proceed){ return }

        const r = await this.context.deleteEvent(_id)

        if(r.status === 200){ this.handleClose() }

        else{
            alert(r.message || 'An error occurred.')
            this.context.signout()
        }
    }

    async handleSubmit(e){
        e.preventDefault()

        const { title, description, startDate, startTime, endDate, endTime, guests } = this.state
        const { event: oldEvent, create } = this.props
        
        const start = new Date(
            ( startDate || oldEvent.startDate.toString().replace(/(.+?\s)\d{2}:\d{2}.+/, '$1') ) + ' ' + 
            ( startTime || oldEvent.startDate.toString().replace(/.+?(\d{2}:\d{2}).+/, '$1') )
        )

        const end = new Date(
            ( endDate || oldEvent.endDate.toString().replace(/(.+?\s)\d{2}:\d{2}.+/, '$1') ) + ' ' + 
            ( endTime || oldEvent.endDate.toString().replace(/.+?(\d{2}:\d{2}).+/, '$1') )
        )
        
        if(start > end){
            this.setState({ isTimeInvalid: true, invalidMessage: 'The event can\'t end before it starts.' })
        }
        
        else if(end - start < 5*60*1000){
            this.setState({ isTimeInvalid: true, invalidMessage: 'The event\'s minimum duration is 5 minutes.' })
        }
        
        else{
            const edits = {}
            if(title){ edits.title = title }
            if(description){ edits.description = description }
            if(startDate || startTime){ edits.startDate = start }
            if(endDate || endTime){ edits.endDate = end }
            if(guests){ edits.guests = guests.map(e => e) }

            const r = this.props.create 
                ? await this.context.createEvent(title, description, start, end, guests)
                : await this.context.editEvent(edits, oldEvent._id)
            
            if(r.status === 200){
                alert(`The event "${title}" was successfully ${create ? 'created' : 'edited'}!`)
                this.handleClose()
            }

            else{
                this.setState({ isTimeInvalid: true, invalidMessage: r.message })

                // conflict
                if(r.status === 409){
                    alert( r.message.replace(/^(.+?with\s).+$/, '$1') + 'the following events: \n' + r.overlaps.reduce(
                        (acc, cur) => ( 
                            acc + `\n  * ${cur.title} | ${this.context.getDate(new Date(cur.startDate), new Date(cur.endDate))}`
                        ), ''
                    ))
                }
                
                else if(r.status === 404){
                    alert('An error occured.')
                    this.context.signout()
                }
            }
        }
    }

    render = () => {
        const { isOpen, create, event } = this.props

        return (
            <Modal isOpen={isOpen} onClose={this.handleClose} id='new-event-modal' motionPreset='none' initialFocusRef={this.ref}>
                <ModalOverlay/>

                <ModalContent>
                    <ModalHeader>{ create ? 'Create new' : 'Edit the' } event</ModalHeader>
                    <ModalCloseButton/>

                    <ModalBody>
                        <VStack as='form' spacing={7} onSubmit={this.handleSubmit} id='new-event-forms'>
                            <FormControl id='title' isRequired={create}>
                                <FormLabel>Event title:</FormLabel>
                                { !create ? <Text fontWeight='bold' fontSize='xs'>{event.title}</Text> : '' }
                                <Input 
                                    type='text' name='title' ref={this.ref}
                                    value={this.state.title} onChange={this.handleChange}
                                    bg='blue.200' errorBorderColor='crimson'
                                />
                            </FormControl>

                            <FormControl isInvalid={this.state.isTimeInvalid} isRequired={create}>
                                <FormLabel>Start:</FormLabel>
                                { 
                                    !create 
                                    ? <Text fontWeight='bold' fontSize='xs'>{this.context.getDate(event.startDate, event.endDate).split(' - ')[0]}</Text> 
                                    : '' 
                                }
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

                            <FormControl isInvalid={this.state.isTimeInvalid} isRequired={create}>
                                <FormLabel>End:</FormLabel>
                                { 
                                    !create 
                                    ? <Text fontWeight='bold' fontSize='xs'>{this.context.getDate(event.startDate, event.endDate).split(' - ')[1]}</Text> 
                                    : '' 
                                }
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
                                { !create ? <Text fontWeight='bold' fontSize='xs'>{event.description}</Text> : '' }
                                <Textarea 
                                    type='text' name='description' 
                                    value={this.state.description} onChange={this.handleChange}
                                    bg='blue.200' errorBorderColor='crimson'
                                />
                            </FormControl>

                            <HStack w='100%' justify='right' spacing={5}>
                                <Button colorScheme="blue" variant='solid' type='submit'>Save</Button>
                                <Button colorScheme='blue' variant="outline" onClick={this.handleClose}>Cancel</Button>
                                { !create ? <Button colorScheme='red' variant="solid" onClick={this.handleDelete}>Delete</Button> : '' }
                            </HStack>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        )
    }
}

export default EventFormsModal