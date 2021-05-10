import React from 'react'
import $ from 'jquery'
import { Heading, VStack } from '@chakra-ui/layout'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    ButtonGroup
} from "@chakra-ui/react"
import { DataContext } from '../../../app/context'

class SigninForms extends React.Component {
    static contextType = DataContext

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

        if(this.context.validatePw(this.state.pw)){
            const { email, pw } = this.state
            const r = await this.context.signin(email, pw)
            
            if(r.status === 200){
                this.setState({ email: '', isEmailInvalid: false, pw: '', isPwInvalid: false })

                localStorage.setItem('jwt', JSON.stringify(r.jwt))
                this.props.history.push('/')
            }
            
            else{
                alert(r.message)
                this.setState({ isEmailInvalid: false, pw: '', isPwInvalid: false })
            }
        }
        
        else{
            this.setState({isPwInvalid: true})
            $('#pw').trigger('focus')
        }
    }
    
    render = () => (
        <VStack as='form' onSubmit={this.handleSubmit} spacing={10}>
            <Heading>LOG IN TO YOUR ACCOUNT</Heading>

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
                <Button variant='solid' type='submit' colorScheme='blue'>SIGN-IN</Button>
                <Button variant='outline' type='button' onClick={this.props.toggle} colorScheme='blue'>SIGN-UP</Button>
            </ButtonGroup>
        </VStack>
    )
}

export default SigninForms