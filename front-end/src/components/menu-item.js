import { Text } from '@chakra-ui/layout'
import React from 'react'
import { Link } from 'react-router-dom'

class MenuItem extends React.Component {
    render = () => (
        this.props.link
        ?
            <Link to={this.props.to || '/'}>
                <Text display='block' userSelect='none' {...this.props.props}>
                    {this.props.children}
                </Text>
            </Link>
        :
            <Text display='block' userSelect='none' {...this.props.props}>
                {this.props.children}
            </Text>
    )
}

export default MenuItem