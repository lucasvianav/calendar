import { Button } from '@chakra-ui/button'
import { Text } from '@chakra-ui/layout'
import React from 'react'
import { Link } from 'react-router-dom'

class MenuItem extends React.Component {
    render = () => (
        this.props.onClick
        ?
            <Button onClick={this.props.onClick} variant='ghost'>
                <Text display='block' userSelect='none' {...this.props.props}>
                    {this.props.children}
                </Text>
            </Button>
        :
            <Text display='block' userSelect='none' {...this.props.props}>
                {this.props.children}
            </Text>
    )
}

export default MenuItem