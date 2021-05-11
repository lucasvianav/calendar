
import React from 'react'
import MenuSandwichToggle from './menu-sandwich-toggle'
import MenuPanel from './menu-panel'

class Menu extends React.Component {
    render = () => (
        <>
            <MenuSandwichToggle toggle={this.props.toggle} isOpen={this.props.isOpen}/>
            <MenuPanel/>
        </>
    )
}

export default Menu