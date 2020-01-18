import React, { Component } from 'react'
import Cell from './Cell';
import { format, startOfWeek, addDays, startOfMonth, 
    endOfMonth, endOfWeek, isSameDay } from "date-fns";

export class Cells extends Component {
    state = {
        selectedDate: new Date()
    };
    
    render() {
        const {currentMonth, events} = this.props;
        const { selectedDate } = this.state;
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);
        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
        
          for (let i = 0; i < 7; i++) {
            formattedDate = format(day, dateFormat);
            // eslint-disable-next-line
            let daysEvents = events.filter(event => isSameDay(day, event.start));

            daysEvents.sort(function compare(a, b) {
              var dateA = new Date(a.start);
              var dateB = new Date(b.start);
              return dateA - dateB;
            });

            days.push(
              <Cell day={day}
                key={day}
                monthStart={monthStart}
                selectedDate={selectedDate}
                formattedDate={formattedDate}
                events={daysEvents}
              />
            );
            day = addDays(day, 1);
          }
          rows.push(
            <div className="row" key={day}>
              {days}
            </div>
          );
          days = [];
        }

        return (
            <div className="body">{rows}</div>
        )
    }
}

export default Cells
