import { Button } from '@chakra-ui/button'
import { Heading } from '@chakra-ui/layout'
import { ImGoogle } from 'react-icons/im'
import React from 'react'
import api from '../connection'
import axios from 'axios'

class LoginGoogleButton extends React.Component {
    async onClick(){
        console.log('aqui')
        console.log((await api.get('/auth/google')).data)
        console.log('ali')
    }

    render = () => (
        <Button colorScheme='blue' size='lg' iconSpacing={5} variant='solid' leftIcon={<ImGoogle/>}>
            <Heading as='h4' fontSize='md' display='inline-block' mt='4%' onClick={this.onClick}>Acessar</Heading>
        </Button>
    )
}

export default LoginGoogleButton