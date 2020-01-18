import React, { Component } from 'react'
import { isSameDay, isSameMonth, format} from 'date-fns';
import EventDialog from './EventDialog';

export class Cell extends Component {

    state = {
        show: false
    }

    showModal = e => {
        this.setState({
          show: !this.state.show
        });
      };

    handleClose = () => {
        console.log('triggered');
        this.setState({open: false})
    }
    
    render() {
        const {day, monthStart, selectedDate, formattedDate, events} = this.props;

        let eventsMarkup = events.length > 0 ? events.map(event => (<p key={event.id}> - ({format(event.start, 'p')}) {event.title}</p>)) : null

        return (
            <div
                className={`col cell ${
                  !isSameMonth(day, monthStart)
                    ? "disabled"
                    : isSameDay(day, selectedDate) ? "selected" : ""
                }`}
                key={day}
                onClick={e => {this.showModal();}}
            >
                {eventsMarkup}
                <span className="number">{formattedDate}</span>
                <span className="bg">{formattedDate}</span>
                <EventDialog onClose={this.showModal} show={this.state.show} events={eventsMarkup}/>
            </div>
        )
    }
}

export default Cell
