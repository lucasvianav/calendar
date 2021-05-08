import React from 'react'
import CalendarItem from './calendar-item'

const minutesInDay = 60*24

class CalendarEvent extends React.Component {
    constructor(props){
        super(props)

        let { startDate, endDate } = this.props

        // parses date
        startDate = new Date(startDate)
        endDate = new Date(endDate)

        // duration in minutes (floored)
        const duration = parseInt((endDate-startDate)/(1000*60))
        
        const rowStart = startDate.getHours()*60 + startDate.getMinutes() + 1
        const colStart = startDate.getDay() + 2

        // number of days the event lasts
        const noDays = parseInt(duration/(24*60))

        this.state = { rowStart, endDate, colStart, duration, noDays }
    }

    render = () => (
        <>
            <CalendarItem {...this.state}/>

            {/* in case the event lasts multiple days */}
            {
                Array.from(
                    {length: this.state.noDays}, 
                    (_, i) => ( 
                        <CalendarItem 
                            rowStart={2} colStart={this.state.colStart+1+i} 
                            duration={
                                i < this.state.noDays-1 
                                    ? minutesInDay 
                                    : this.state.endDate.getMinutes() + this.state.endDate.getHours()*60
                            }
                        /> 
                    )
                )
            }
        </>
    )
}

export default CalendarEvent