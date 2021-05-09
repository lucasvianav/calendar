import React from 'react'
import { Flex, Center, Heading } from '@chakra-ui/layout'
import LoginButton from '../components/login-button'
import LoginForms from '../components/login-forms'
import Logo from '../components/logo'

class Login extends React.Component {
    render = () => (
        <Center as='body' h='100vh'>
            <Flex w='fit-content' h='fit-content' shadow='2xl' bg='orange.50' justify='center' align='center' direction='column' p='5%' pt='2%' textAlign='center'>
                <Logo type='gif' mb='15%'/>
                <LoginForms/>
            </Flex>
        </Center>
    )
}

export default Login