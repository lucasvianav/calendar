import React from 'react'
import { Flex, Center, Heading } from '@chakra-ui/layout'
import SigninForms from '../components/signin-forms'
import Logo from '../components/logo'
import SignupForms from '../components/signup-forms'

class Auth extends React.Component {
    constructor(props){
        super(props)
        
        if(JSON.parse(localStorage.getItem('jwt'))){
            this.props.history.push('/')
        }

        this.state = { signin: this.props.type === 'signin' }

        this.toggleForms = this.toggleForms.bind(this)
    }
    
    toggleForms = () => this.setState(prevState => ({signin: !prevState.signin}))

    render = () => (
        <Center h='100vh'>
            <Flex w='fit-content' maxW='70%' shadow='2xl' bg='orange.50' justify='center' align='center' direction='column' y='5%' p={['1%', '5%', '3%', '5%']} textAlign='center'>
                <Logo type='gif' m='0' mb='12%'/>
                { this.state.signin ? <SigninForms {...this.props} toggle={this.toggleForms}/> : <SignupForms {...this.props} toggle={this.toggleForms}/> }
            </Flex>
        </Center>
    )
}

export default Auth