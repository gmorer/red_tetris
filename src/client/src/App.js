import React from 'react';
import openSocket from 'socket.io-client';
import { toast } from 'react-toastify';
import SocketHandler from './containers/socketHandler'

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const PORT = 8080
const URL = process.env.NODE_ENV === 'production' ? '/' : `localhost:${PORT}`;

const mainStyle = {
	height: "100%",
	backgroundImage: "url('bg2.jpg')",
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	textAlign: "center",
	width: "100%"
}

const App = () => {
	const socket = openSocket(URL);
	const regexResult = /\#(.*)\[(.*)\]/.exec(window.location.hash) // eslint-disable-line
	toast.configure({ autoClose: 8000, draggable: false });
	socket.on('disconnect', () => toast.error("Got disconect :("))
	socket.on("connect_error", () => toast.error("Cannot connect to the server"))
	socket.on("reconnect", () => toast.success("Successfully reconected to the server"))
	if (!!regexResult) {
		return (
			<div style={mainStyle}>
				<SocketHandler
					socket={socket}
					defaultName={regexResult[2].trim() || null}
					defaultRoomName={regexResult[1].trim() || null}
				/>
			</div>
		)
	}
	return (
		<div style={mainStyle}>
			<SocketHandler socket={socket} />
		</div>
	)
}

export default App;
