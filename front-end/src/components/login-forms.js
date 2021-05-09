import React from 'react'
import $ from 'jquery'
import { Flex, Heading, HStack, VStack } from '@chakra-ui/layout'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Form,
    Button,
    ButtonGroup
} from "@chakra-ui/react"


const isValidPassword = (pw) => {
    /** Password Regex Explanation
        * (?=\S*?[0-9]) - a digit must occur at least once
        * (?=\S*?[a-z]) - a lower case letter must occur at least once
        * (?=\S*?[A-Z]) - an upper case letter must occur at least once
        * \S{8,} - at least 8 characters
        * \S - no whitespace allowed
        */
        let pwRegex = RegExp("(?=\\S*?[0-9])(?=\\S*?[a-z])(?=\\S*?[A-Z])\\S{8,}")

    return !(pw.includes(' ') || !pwRegex.test(pw))
}

class LoginForms extends React.Component {
    constructor(props){
        super(props)

        this.state = { 
            email: '', isEmailInvalid: false,
            pw: '', isPwInvalid: false 
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        const {name, value} = e.target

        if(value !== ' '){ this.setState({ [name]: value, isEmailInvalid: false, isPwInvalid: false }) } 
    }
    
    async handleSubmit(e){
        e.preventDefault()

        if(isValidPassword(this.state.pw)){
            
        }
        
        else{
            this.setState({isPwInvalid: true})
            $('#pw').trigger('focus')
        }
    }
    
    redirectSignup(){
        
    }
        
    render = () => (
        <VStack as='form' onSubmit={this.handleSubmit} spacing={10}>
            <Heading>Login</Heading>

            <FormControl id='email' isInvalid={this.state.isEmailInvalid} isRequired>
                <FormLabel as='label'>Email address:</FormLabel>
                <Input 
                    type='email' name='email' 
                    value={this.state.email} onChange={this.handleChange}
                    bg='blue.200' errorBorderColor='crimson'
                />
            </FormControl>

            <FormControl id='pw' isInvalid={this.state.isPwInvalid} isRequired>
                <FormLabel as='label'>Password:</FormLabel>
                <Input 
                    type='password' name='pw' 
                    value={this.state.pw} onChange={this.handleChange}
                    bg='blue.200' errorBorderColor='crimson'
                />
                <FormErrorMessage>Your password is invalid.</FormErrorMessage>
            </FormControl>

            <ButtonGroup size='lg' spacing={6} justifyContent='center'>
                <Button variant='solid' type='submit' colorScheme='blue'>Signin</Button>
                <Button variant='outline' type='button' onClick={this.redirectSignup} colorScheme='blue'>Signup</Button>
            </ButtonGroup>
        </VStack>
    )
}

export default LoginForms