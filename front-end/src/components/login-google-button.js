import { Button } from '@chakra-ui/button'
import { Heading } from '@chakra-ui/layout'
import { ImGoogle } from 'react-icons/im'
import React from 'react'

class LoginGoogleButton extends React.Component {
    onClick = () => {
    }

    render = () => (
        <Button colorScheme='blue' size='lg' iconSpacing={5} variant='solid' leftIcon={<ImGoogle/>}>
            <Heading as='h4' fontSize='md' display='inline-block' mt='4%' onClick={this.onClick}>Acessar</Heading>
        </Button>
    )
}

export default LoginGoogleButton