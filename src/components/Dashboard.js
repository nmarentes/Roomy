import React, { Component } from 'react';
import RoomManager from './untouched/RoomManager';
import Scheduler from './untouched/Scheduler';
import Header from './Header';
import axios from 'axios';


const Dashboard = (props) =>{
	console.log(props.children.rooms);
		return (
		<div>
			<Header />
			<section id="status-messages" className="hidden">
				<div className="container"></div>
			</section>
			<section id="main">
				<div className="container cf">
					<h1>Welcome, </h1>
					<div id="reservations">
						<h2>Your Reservations</h2>
						<ul>
							Reservations
						</ul>
						<a href="#" className="dashboard-button">Make Reservation</a>
					</div>

					<div id="rooms">
						<h2>Your Rooms</h2>
						<div id="room-headings" className="cf">
							<div className="name">Name</div>
							<div className="capacity">Capacity</div>
						</div>
						
						<ul>
							{props.children.rooms.map(function(room, index) {
								return (
									<li className="room" key={index}>
										<div className="room-name">{room.name}</div>
										<div className="room-size">{room.capacity}</div>
									</li>
								)
							})}
						</ul>
						<a href="#" className="dashboard-button">Add Room</a>
					</div>
				</div>
			</section>
		</div>
		)
  }
export default Dashboard;