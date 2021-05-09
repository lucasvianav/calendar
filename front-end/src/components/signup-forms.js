import React from 'react'
import $ from 'jquery'
import { Heading, VStack } from '@chakra-ui/layout'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    ButtonGroup
} from "@chakra-ui/react"
import { DataContext } from '../app/context'

class SignupForms extends React.Component {
    static contextType = DataContext

    constructor(props){
        super(props)

        this.state = { 
            name: '',
            email: '', isEmailInvalid: false,
            emailConfirmation: '', isEmailConfirmationInvalid: false,
            pw: '', isPwInvalid: false,
            pwConfirmation: '', isPwConfirmationInvalid: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        const {name, value} = e.target
        
        const confirmation = 'is' + name.replace(/^\w/, c => c.toUpperCase()) + 'Invalid'

        if(name === 'name' || value !== ' '){ this.setState({ [name]: value, [confirmation]: false}) } 
    }
    
    async handleSubmit(e){
        e.preventDefault()
        
        const { name, email, emailConfirmation, pw, pwConfirmation } = this.state
        
        // if the name is invalid (empty or only one letter)
        if(name.length < 2){
            this.setState({isEmailConfirmationInvalid: true})
            $('#emailConfirmation').trigger('focus')
        }

        // if the email is different from it's confirmation
        else if(email !== emailConfirmation){
            this.setState({isEmailConfirmationInvalid: true})
            $('#emailConfirmation').trigger('focus')
        }

        // if the pw is invalid
        else if(!this.context.validatePw(pw)){
            this.setState({isPwInvalid: true})
            $('#pw').trigger('focus')
        }

        // if the pw is different from it's confirmation
        else if(pw !== pwConfirmation){
            this.setState({isPwConfirmationInvalid: true})
            $('#pwConfirmation').trigger('focus')
        }
        
        // if it's all ok
        else{
            const r = await this.context.signup(name, email, pw)

            if(r.status === 200){
                this.setState({ 
                    name: '', 
                    email: '', isEmailInvalid: false,
                    emailConfirmation: '', isEmailConfirmationInvalid: false,
                    pw : '', isPwInvalid: false,
                    pwConfirmation: '', isPwConfirmationInvalid: false
                })
                
                localStorage.setItem('jwt', JSON.stringify(r.jwt))
                this.props.history.push('/')
            }
            
            else{
                alert(r.message)
                this.props.toggle()
            }
        }
    }
    
    render = () => (
        <VStack as='form' onSubmit={this.handleSubmit} spacing={10}>
            <Heading>CREATE AN ACCOUNT</Heading>

            <FormControl id='name' isRequired>
                <FormLabel as='label'>Name:</FormLabel>
                <Input 
                    type='text' name='name' 
                    value={this.state.name} onChange={this.handleChange}
                    bg='blue.200' errorBorderColor='crimson'
                />
                <FormErrorMessage>The name is invalid.</FormErrorMessage>
            </FormControl>

            <FormControl id='email' isInvalid={this.state.isEmailInvalid} isRequired>
                <FormLabel as='label'>Email address:</FormLabel>
                <Input 
                    type='email' name='email' 
                    value={this.state.email} onChange={this.handleChange}
                    bg='blue.200' errorBorderColor='crimson'
                />
                <FormErrorMessage>The email is invalid.</FormErrorMessage>
            </FormControl>

            <FormControl id='emailConfirmation' isInvalid={this.state.isEmailConfirmationInvalid} isRequired>
                <FormLabel as='label'>Email address confirmation:</FormLabel>
                <Input 
                    type='email' name='emailConfirmation' 
                    value={this.state.emailConfirmation} onChange={this.handleChange}
                    bg='blue.200' errorBorderColor='crimson'
                />
                <FormErrorMessage>The email confirmation must be identical to the email.</FormErrorMessage>
            </FormControl>

            <FormControl id='pw' isInvalid={this.state.isPwInvalid} isRequired>
                <FormLabel as='label'>Password:</FormLabel>
                <Input 
                    type='password' name='pw' 
                    value={this.state.pw} onChange={this.handleChange}
                    bg='blue.200' errorBorderColor='crimson'
                />
                <FormHelperText>The password must contain at least 8 characters, including at least one number, one lowercase letter and one uppercase letter.</FormHelperText>
                <FormErrorMessage>Your password is invalid.</FormErrorMessage>
            </FormControl>

            <FormControl id='pwConfirmation' isInvalid={this.state.isPwConfirmationInvalid} isRequired>
                <FormLabel as='label'>Password confirmation:</FormLabel>
                <Input 
                    type='password' name='pwConfirmation' 
                    value={this.state.pwConfirmation} onChange={this.handleChange}
                    bg='blue.200' errorBorderColor='crimson'
                />
                <FormErrorMessage>The password confirmation must be identical to the password.</FormErrorMessage>
            </FormControl>

            <ButtonGroup size='lg' spacing={6} justifyContent='center'>
                <Button variant='solid' type='submit' colorScheme='blue'>SIGN-UP</Button>
                <Button variant='outline' type='button' onClick={this.props.toggle} colorScheme='blue'>SIGN-IN</Button>
            </ButtonGroup>
        </VStack>
    )
}

export default SignupForms