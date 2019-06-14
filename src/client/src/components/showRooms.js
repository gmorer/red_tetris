import React from 'react'
import NameChooser from './nameChooser'

const mainStyle = {
	height: "100%",
	overflowY: "auto",
	backgroundImage: "url('bg2.jpg')",
	backgroundSize: "100% 100%",
	backgroundRepeat: "no-repeat",
	width: "100%"
}

const topBarStyle = {
	borderRadius: "5px",
	textAlign: "end",
	padding: "1em",
	marginBottom: "1em",
	boxShadow: "0 2px 3px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1)"
}

const entryStyle = {
	height: "10em",
	width: "20em",
	color: "white",
	backgroundColor: "#9f233a",
	fontSize: "10px",
	boxShadow: "0 2px 3px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1)",
	margin: "1em",
	textAlign: "center",
	borderRadius: "10px",
	border: "2px solid white",
	overflow: "hidden"
}

const roomListStyle = {
	display: "flex",
	justifyContent: "space-around",
	flexFlow: "row wrap",
	padding: "0",
	margin: "0",
	alignItems: "center"
}

const buttonStyle = {
	marginLeft: "1em",
	color: "#fff",
	backgroundColor: "#9f233a",
	borderRadius: "10px",
	display: "inline-block",
	border: "2px solid white",
	width: "15em",
	height: "5em"
}

const nameStyle = {
	// display: "inline-block",
	color: "white",
	fontSize: "50px",
	textAlign: "center"
}

const joinRoom = (socket, name, id, setRoomName) => () => {
	socket.emit('hideConnect', { playerId: name, roomId: id }, itWorked => {
		if (!itWorked) alert("Error maybe someone as the same name as you in this room")
		else setRoomName(id)
	})
}

const RoomCard = (socket, name, setRoomName) => ({ id, no }, index) => (
	<div style={entryStyle} key={index}>
		<div style={{ height: "60%" }}>
			<h2 style={{ marginTop: "5%" }}>{id}</h2>
			<br />
			{`${no} player${no > 1 ? 's' : ''}`}
		</div>
		<button
			style={{ height: "35%", width: "100%", border: "none", outline: "none", cursor: "pointer" }}
			onClick={joinRoom(socket, name, id, setRoomName)}>
			Join
		</button>
	</div>
)

const newRoom = (socket, playerId, setRoomName) => () => {
	const roomId = prompt("Enter room name");
	if (roomId === null) return
	if (!roomId.trim()) return alert("invalid name")
	socket.emit('hideConnect', { roomId: roomId.trim(), playerId }, itWorked => {
		if (!itWorked) alert("Error maybe the name is already taken")
		else setRoomName(roomId)
	})
}

const ShowRooms = ({ rooms, name, socket, setName, setRoomName }) => {
	if (!name) return <NameChooser setName={setName} />
	else return (
		// return (
		<div style={mainStyle}>
			<div style={topBarStyle}>
				<p style={nameStyle}> Bienvenue {name}</p>
				<button style={buttonStyle} onClick={() => setName(null)}>
					<p style={{ fontSize: "150%" }}>change username</p>
				</button>
			</div>
			<div style={roomListStyle}>
				<button style={entryStyle} onClick={newRoom(socket, name, setRoomName)}>Create new Room</button>
				{rooms.map(RoomCard(socket, name, setRoomName))}
			</div>
		</div >
	)
}

export default ShowRooms