import React, { Component } from 'react'

export class EventDialog extends Component {


    onClose = e => {
        this.props.onClose && this.props.onClose(e);
      };

    render() {
        const { show, events } = this.props;

        return (
            
            <div className={`card-bg ${
                (!show || events === null) ? "card-disabled" : "card-visible"
            }`}
            
            >
            
                <div className="card">
                <div className="close" onClose={e => {this.onClose(e);}}></div>
                    <div className="card-inner">
                        {events}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default EventDialog
