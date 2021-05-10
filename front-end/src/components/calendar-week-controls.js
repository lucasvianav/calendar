import { Button, ButtonGroup } from '@chakra-ui/button'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import React from 'react'

class WeekControls extends React.Component {
    render = () => (
        <ButtonGroup {...this.props.style}>
            <Button variant='ghost' onClick={this.props.pastWeek}><AiOutlineArrowLeft/></Button>
            <Button variant='ghost' onClick={this.props.nextWeek}><AiOutlineArrowRight/></Button>
        </ButtonGroup>
    )
}

export default WeekControls