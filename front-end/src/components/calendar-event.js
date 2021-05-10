import React from 'react'
import CalendarItem from './calendar-item'

const minutesInDay = 60*24
const milisecsInDay = minutesInDay*60*1000

class CalendarEvent extends React.Component {
    constructor(props){
        super(props)

        const { eventObj } = this.props
        const { startDate, endDate } = eventObj

        // duration in minutes (floored)
        const duration = parseInt((endDate-startDate)/(1000*60))
        
        const rowStart = startDate.getHours()*60 + startDate.getMinutes() + 1
        const colStart = startDate.getDay() + 2

        // number of days the event lasts
        const getDays = date => parseInt(date.valueOf()/milisecsInDay)
        const noDays = getDays(endDate) - getDays(startDate)
        // const noDays = parseInt(duration/(24*60))

        this.state = { event: eventObj, rowStart, colStart, duration, noDays }
    }

    render = () => {
        // deep copies the event
        const e = {...this.state.event}
        e.startDate = new Date(e.startDate)
        e.endDate = new Date(e.endDate)

        // alters the end time if necessary
        if(this.state.noDays > 0){ e.endDate.setHours(23, 59, 59, 999) }

        return(
            <>
                <CalendarItem k={(this.props.keys) + String(Math.random())} {...this.state} event={e}/>

                {/* in case the event lasts multiple days */}
                {
                    Array.from(
                        {length: this.state.noDays}, 
                        (_, i) => {
                            // deep copies the event
                            const editedEvent = {...this.state.event}
                            editedEvent.startDate = new Date(editedEvent.startDate)
                            editedEvent.endDate = new Date(editedEvent.endDate)

                            // alters the start and end time if necessary
                            editedEvent.startDate.setHours(0, 0, 0, 0)
                            if(i < this.state.noDays-1 ){ editedEvent.endDate.setHours(23,59,59,999) }

                            return ( 
                                <CalendarItem  
                                    k={String(this.props.keys + String(i)) + '-' + String(i)}
                                    key={String(this.props.keys + String(i)) + '-' + String(i)}
                                    rowStart={2} colStart={this.state.colStart+1+i} 
                                    duration={
                                        i < this.state.noDays-1 
                                            ? minutesInDay 
                                            : editedEvent.endDate.getMinutes() + editedEvent.endDate.getHours()*60
                                    }
                                    event={editedEvent}
                                /> 
                            )
                        }
                    )
                }
            </>
    )}
}

export default CalendarEvent