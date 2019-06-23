import React from "react"
import Chat from "./chat"
import { twoDArray } from '../containers/utils'

const entryStyle = {
	height: "20em",
	width: "20em",
	color: "black",
	backgroundColor: "transparent",
	fontSize: "10px",
	boxShadow: "0 2px 3px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1)",
	margin: "1em",
	textAlign: "center",
	borderRadius: "10px",
	border: "2px solid white",
	overflow: "hidden",
	background: "linear-gradient(to bottom right, #9f233a, white)",
}

const nameStyle = {
	color: "white",
	fontSize: "50px",
	textAlign: "center"
}

const readyStyle = {
	color: "#fff",
	position: "fixed",
	bottom: "4em",
	right: "4em",
	borderRadius: "10px",
	height: "6em",
	width: "10em",
	backgroundColor: "rgba(159, 35, 58, 0.9)",
}

const stateStyle = state => ({
	height: "35%",
	width: "100%",
	textAlign: "center",
	backgroundColor: state === "ready" ? "green" : "white",
	paddingTop: "10%" // redo that
})

const PlayerCard = ({ name, state }, index) => (
	<div style={entryStyle} key={index}>
		<div style={{ height: "60%" }}>
			<h2 style={{ marginTop: "5%" }}>{name}</h2>
		</div>
		<div style={stateStyle(state)}>
			<b>
				{state}
			</b>
		</div>
	</div>
)

const exitRoom = (socket, setState) => () => {
	setState("inactive");
	socket.emit('disconnectFromRoom')
}

const readyButton = (socket, setState, setTab) => () => {
	setTab(twoDArray(20, 10, ' '))
	setState("ready");
	socket.emit('changeState', "ready")
}

const LoadingRoom = ({ socket, setState, players, roomName, messages, name, setTab }) => (
	<div>
		<div className="topBarStyle">
			<p style={nameStyle}>{roomName}</p>
			<button className="redButton" onClick={exitRoom(socket, setState)}>Exit Room</button>
		</div>
		<div style={{ display: "flex", height: "40%", marginLeft: "5%", width: "90%" }}>
			<Chat messages={messages} socket={socket} />
			<div style={{ width: "65%", display: "flex", justifyContent: "space-evenly", marginLeft: "5%" }}>
				{players.map(PlayerCard)}
				<button onClick={readyButton(socket, setState, setTab)} style={readyStyle}><b>Ready</b></button>
			</div>
		</div>
	</div >
)

export default LoadingRoom