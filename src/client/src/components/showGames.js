import React from 'react'
import NameChooser from './nameChooser'

const mainStyle = {
	height: "100%",
	backgroundImage: "url('bg.jpg')",
	backgroundSize: "cover",
	backgroundColor: "blue",
	overflowY: "auto"
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

const buttonStyle = {
	marginLeft: "1em",
	color: "#fff",
	backgroundColor: "black",
	borderRadius: "50px",
	display: "inline-block",
	border: "none",
	width: "15em",
	height: "5em"
}

const joinGame = (socket, name, id, setGameName) => () => {
	socket.emit('hideConnect', { playerId: name, gameId: id }, itWorked => {
		if (!itWorked) alert("Error maybe someone as the same name as you in that game")
		else setGameName(id)
	})
}

const GameCard = (socket, name, setGameName) => ({ id, no }, index) => (
	<div style={entryStyle} key={index}>
		<div style={{ height: "60%" }}>
			<h2 style={{ marginTop: "5%" }}>{id}</h2>
			<br />
			{`${no} player${no > 1 ? 's' : ''}`}
		</div>
		<button
			style={{ height: "35%", width: "100%", border: "none", outline: "none", cursor: "pointer" }}
			onClick={joinGame(socket, name, id, setGameName)}>
			Join
		</button>
	</div>
)

const newGame = (socket, playerId, setGameName) => () => {
	const gameId = prompt("Enter game name");
	if (gameId === null) return
	if (!gameId.trim()) return alert("invalid name")
	socket.emit('hideConnect', { gameId: gameId.trim(), playerId }, itWorked => {
		if (!itWorked) alert("Error maybe the name is already taken")
		else setGameName(gameId)
	})
}

const ShowGames = ({ games, name, socket, setName, setGameName }) => {
	if (!name) return <NameChooser setName={setName} />
	else return (
		<div style={mainStyle}>
			<div style={topBarStyle}>
				<p style={{ display: "inline-block", color: "white", fontSize: "30px" }}>{name}</p>
				<button style={buttonStyle} onClick={() => setName(null)}>
					<p style={{ fontSize: "150%" }}>change username</p>
				</button>
			</div>
			<div style={gameListStyle}>
				<button style={entryStyle} onClick={newGame(socket, name, setGameName)}>+</button>
				{games.map(GameCard(socket, name, setGameName))}
			</div>
		</div >
	)
}

export default ShowGames