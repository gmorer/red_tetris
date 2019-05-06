import React from 'react'
import NameChooser from './nameChooser'

// const games = [{ id: "superGame", no: 6 }]

const mainStyle = {
	height: "100%",
	backgroundColor: "blue",
	overflowY: "auto"
}

const topBarStyle = {
	backgroundColor: "red",
	textAlign: "end",
	padding: "1em",
	marginBottom: "1em",
	boxShadow: "0 2px 3px rgba(10,10,10,.1),0 0 0 1px rgba(10,10,10,.1)"
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

const gameListStyle = {
	display: "flex",
	justifyContent: "space-around",
	flexFlow: "row wrap",
	padding: "0",
	margin: "0",
	alignItems: "center"
}

const joinGame = (socket, name, id) => () => {
	socket.emit('connectToGame', { playerId: name, gameId: id }, itWorked => {
		if (!itWorked) alert("Error maybe someone as the same name as you in that game")
	})
}

const GameCard = (socket, name) => ({ id, no }, index) => (
	<div style={entryStyle} key={index}>
		<div style={{ height: "60%" }}>
			<h2 style={{ marginTop: "5%" }}>{id}</h2>
			<br />
			{`${no} player${no > 1 ? 's' : ''}`}
		</div>
		<button
			style={{ height: "35%", width: "100%", border: "none", outline: "none", cursor: "pointer" }}
			onClick={joinGame(socket, name, id)}>
			Join
		</button>
	</div>
)

const newGame = (socket, playerId) => () => {
	const gameId = prompt("Enter game name");
	if (gameId === null) return
	if (!gameId.trim()) return alert("invalid name")
	socket.emit('newGame', { gameId: gameId.trim(), playerId }, itWorked => {
		if (!itWorked) alert("Error maybe the name is already taken")
	})
}

const ShowGames = ({ games, name, socket, setName }) => {
	if (!name) return <NameChooser setName={setName} />
	else return (
		<div style={mainStyle}>
			{console.log(games)}
			<div style={topBarStyle}>
				{name}
				<button style={{ marginLeft: "1em" }} onClick={() => setName(null)}>
					change username
		</button>
			</div>
			<div style={gameListStyle}>
				<button style={entryStyle} onClick={newGame(socket, name)}>+</button>
				{games.map(GameCard(socket, name))}
			</div>
		</div >
	)
}

export default ShowGames