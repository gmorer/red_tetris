import React from "react"
import Chat from "./chat"

const mainStyle = {
	height: "100%",
	backgroundImage: "url('bg2.jpg')",
	textAlign: "center",
	backgroundSize: "100% 100%",
	backgroundRepeat: "no-repeat",
	width: "100%"
}

const entryStyle = {
	height: "10em",
	width: "10em",
	backgroundColor: "grey",
	boxShadow: "0 2px 3px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1)",
	margin: "1em",
	textAlign: "center",
	borderRadius: "10px",
	overflow: "hidden"
}

const stateStyle = state => ({
	height: "35%",
	width: "100%",
	textAlign: "center",
	backgroundColor: state === "ready" ? "green" : "red",
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

const readyButton = (socket, setState) => () => {
	setState("ready");
	socket.emit('changeState', "ready")
}

const LoadingRoom = ({ socket, setState, players, roomName, messages, name }) => (
	<div style={mainStyle}>
		<div style={{ paddingTop: "1em", paddingBottom: "1em" }}>
			<b style={{ fontSize: "3em", color: "white" }}>{roomName}</b>
			<button style={{ margin: "1em", float: "right" }} onClick={exitRoom(socket, setState)}>Exit Room</button>
		</div>
		<div style={{ display: "flex", height: "40%", marginLeft: "5%", width: "90%" }}>
			<Chat messages={messages} socket={socket} />
			<div style={{ width: "65%", display: "flex", justifyContent: "space-evenly", marginLeft: "5%" }}>
				{players.map(PlayerCard)}
				<button onClick={readyButton(socket, setState)} style={{ position: "fixed", bottom: "4em", right: "4em", borderRadius: "20px", height: "6em", width: "10em", backgroundColor: "green" }}><b>Ready</b></button>
			</div>
		</div>
	</div >
)

export default LoadingRoom