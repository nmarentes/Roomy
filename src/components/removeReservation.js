import React, { Component} from 'react';
import ReactDOM from 'react-dom';

class RemoveRoom extends Component {
	constructor(props) {
		super(props);
		
		this.removeReservation = this.removeReservation.bind(this);
	}

   removeReservation() {
    axios.delete('/reservation').then((response) => {
      console.log('deleted!')
    })
  }

	render() {
		return (
			<button onClick={this.removeReservation}>Remove Reservation</button>
		);
	}
}

export default RemoveRoom;