import React from 'react'
import { Flex, Center, Heading } from '@chakra-ui/layout'
import LoginGoogleButton from '../components/login-google-button'

class Login extends React.Component {
    render = () => (
        <Center as='body' h='100vh'>
            <Flex w='50%' h='50%' bg='orange.500' justify='space-evenly' align='center' direction='column' p='5%' textAlign='center'>
                <Heading textDecoration='underline'>Log in to your account with Google!</Heading>
                <LoginGoogleButton/>
            </Flex>
        </Center>
    )
}

export default Login