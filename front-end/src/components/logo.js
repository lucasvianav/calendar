import React from 'react'
import { Box, Image } from '@chakra-ui/react'

class Logo extends React.Component {
    render = () => (
        <Box {...this.props}>
            <Image src={`../logo.${this.props.type}`} alt="Calendar Logo"/>
        </Box>
    )
}

export default Logo