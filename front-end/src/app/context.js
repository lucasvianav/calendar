import React from 'react'
export const DataContext = React.createContext()

export class DataProvider extends React.Component {
    constructor(props){
        super(props)

        this.state = {}
    }

    render = () => {
        return(
            <DataContext.Provider value={{}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}
