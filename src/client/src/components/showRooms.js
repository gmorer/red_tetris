import React from 'react'
import NameChooser from './nameChooser'

const entryStyle = {
	height: "10em",
	width: "20em",
	color: "white",
	backgroundColor: "rgba(159, 35, 58, 0.9)",
	margin: "1em",
	textAlign: "center",
	borderRadius: "10px",
	overflow: "hidden",
}

const roomListStyle = {
	display: "flex",
	justifyContent: "space-around",
	flexFlow: "row wrap",
	padding: "0",
	margin: "0",
	alignItems: "center"
}

const nameStyle = {
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

const ShowRooms = ({ rooms, name, socket, setName, setRoomName, no }) => {
	if (!name) return <NameChooser setName={setName} />
	else return (
		<div>
			<p style={{ marginLeft: "1em", position: "absolute", color: "white", fontSize: "25px" }}>Number of player: {no}</p>
			<button className="redButton" onClick={() => setName(null)}>
					<p style={{ fontSize: "150%" }}>change username</p>
				</button>
			<div className="topBarStyle">
				<p style={nameStyle}> Bienvenue {name}</p>
			</div>
			<div style={roomListStyle}>
				<button style={entryStyle} onClick={newRoom(socket, name, setRoomName)}>Create new Room</button>
				{rooms.map(RoomCard(socket, name, setRoomName))}
			</div>
		</div >
	)
}

export default ShowRooms