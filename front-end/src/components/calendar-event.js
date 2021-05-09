import React from 'react'
import CalendarItem from './calendar-item'

const minutesInDay = 60*24

class CalendarEvent extends React.Component {
    constructor(props){
        super(props)

        const { eventObj } = this.props

        // parses date
        const startDate = new Date(eventObj.startDate)
        const endDate = new Date(eventObj.endDate)

        // duration in minutes (floored)
        const duration = parseInt((endDate-startDate)/(1000*60))
        
        const rowStart = startDate.getHours()*60 + startDate.getMinutes() + 1
        const colStart = startDate.getDay() + 2

        // number of days the event lasts
        const noDays = parseInt(duration/(24*60))

        this.state = { event: eventObj, rowStart, colStart, duration, noDays }
    }

    render = () => (
        <>
            <CalendarItem key={this.props.keys} {...this.state}/>

            {/* in case the event lasts multiple days */}
            {
                Array.from(
                    {length: this.state.noDays}, 
                    (_, i) => {
                        const editedEvent = {...this.state.event}
                            editedEvent.startDate.setHours(0, 0, 0, 0)
                            if(i < this.state.noDays-1 ){ editedEvent.endDate.setHours(23,59,59,999) }

                        return ( 
                            <CalendarItem  
                                key={String(this.props.keys) + '-' + String(i)}
                                rowStart={2} colStart={this.state.colStart+1+i} 
                                duration={
                                    i < this.state.noDays-1 
                                        ? minutesInDay 
                                        : this.state.event.endDate.getMinutes() + this.state.endDate.getHours()*60
                                }
                                event={editedEvent}
                            /> 
                        )
                    }
                )
            }
        </>
    )
}

export default CalendarEvent