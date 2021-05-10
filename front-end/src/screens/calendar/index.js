import React from 'react'

import { Async } from 'react-async'
import Header from './components/header'
import CalendarWeek from './components/calendar'
import { DataContext } from '../../app/context'
import { Spinner } from '@chakra-ui/spinner'
import { Center } from '@chakra-ui/layout'

class Calendar extends React.Component {
    static contextType = DataContext
    
    constructor(props){
        super(props)
        if(!JSON.parse(localStorage.getItem('jwt'))){ this.props.history.push('/login') }
    }
    
    async componentDidMount(){
        const r = await this.context.fetchAllData()

        if(r.status === 401){ 
            alert(r.message)
            this.props.history.push('/login') 
        }
    }

    render = () => { 
        const { staticContext, ...rest } = this.props

        const tags = (
             <>
                 <Header {...rest}/> 
                 <CalendarWeek/>
             </>
        )

        return this.context.hasUserData()
        ?  
            <Async promiseFn={this.context.fetchEvents}>
            {
                ({ response, error, isPending }) => isPending
                ? <Center w='100vw' h='100vh'><Spinner size='xl' label='Loading...'/></Center>
                : tags
            }
            </Async>
        :
            <Async promiseFn={this.context.fetchAllData}>
            {
                ({ response, error, isPending }) => isPending
                ? <Center w='100vw' h='100vh'><Spinner size='xl' label='Loading...'/></Center>
                : tags
            }
            </Async>
    }

        

}

export default Calendar