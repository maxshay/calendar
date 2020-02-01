import React, { Component } from 'react';
import { format, addMonths, subMonths } from "date-fns";
import axios from 'axios';
import Cells from './Cells';

export class Calendar extends Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        windowWidth: 0,
        dates: []
    };
    componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);

      // api call
      const calenderId = "GROUP_KEY@group.calendar.google.com";
      let apikey = "API_KEY";
      let dateArray = [];
      axios.get(`https://www.googleapis.com/calendar/v3/calendars/${calenderId}/events?key=${apikey}`)
        .then(res => {
          res.data.items.forEach(item => {
            dateArray.push({
              id: item.id,
              title: item.summary,
              start: new Date(item.start.dateTime),
              end: new Date(item.end.dateTime)
            })
          })

          this.setState({
            dates: dateArray
          });

        })
        .catch(err => {console.log(err)})
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
      this.setState({ windowWidth: window.innerWidth });
    }

    renderHeader() {
      const dateFormat = "MMMM yyyy";
      return (
        <div className="header row row-space-bt">
          <div className="">
            <div className="icon" onClick={this.prevMonth}>
              chevron_left
            </div>
          </div>
          <div className="">
            <span>
              {format(this.state.currentMonth, dateFormat)}
            </span>
          </div>
          <div className="" onClick={this.nextMonth}>
            <div className="icon">chevron_right</div>
          </div>
        </div>
      );
    }

    renderDays() {
      //const dateFormat = "EEEE";
      const daysOfWeekShort = [
        'S',
        'M',
        'T',
        'W',
        'TH',
        'F',
        'S',
      ]
      const daysOfWeek = [
        'SUNDAY',
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
      ]
      const days = [];

      for (let i = 0; i < 7; i++) {
     
          days.push(
            <div className="col col-center" key={i}>
              {this.state.windowWidth < 600 ? daysOfWeekShort[i] : daysOfWeek[i]}
            </div>  
          )
        
      }
      return <div className="days row">{days}</div>;
    }

    onDateClick = day => {
      this.setState({
        selectedDate: day
      });
    };

    nextMonth = () => {
      this.setState({
        currentMonth: addMonths(this.state.currentMonth, 1)
      });
    };

    prevMonth = () => {
      this.setState({
        currentMonth: subMonths(this.state.currentMonth, 1)
      });
    };

    render() {

      return (
          <div className="calendar">
              {this.renderHeader()}
              {this.renderDays()}
              <Cells currentMonth={this.state.currentMonth} events={this.state.dates}/>
          </div>
      )
    }
}

export default Calendar;
