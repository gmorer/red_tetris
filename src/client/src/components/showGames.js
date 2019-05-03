import React from 'react'

const games = ['a', 'b', 'c', 'd', 'a', 'b', 'c', 'd', 'a', 'b', 'c', 'd', 'a', 'b', 'c', 'd', 'a', 'b', 'c', 'd',]

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

const refreshButtonStyle = {
	margin: "1em",
	right: "0px",
	position: "absolute"
}

const plusButton = {
	margin: "1em",
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
	margin: "0"
}

const GameCard = ({ game }) => (
	<div style={entryStyle}>
		<div style={{ height: "60%" }}>
			<h2 style={{ marginTop: "5%" }}>{game}</h2>
			<br />
			4 jouers
		</div>
		<button style={{ height: "35%", width: "100%", border: "none", outline: "none" }}>Join</button>
	</div>
)

const ShowGames = ({ userId, setUserId, newGame }) => (
	<div style={mainStyle}>
		<div style={topBarStyle}>
			{userId}
			<button style={{ marginLeft: "1em" }} onClick={() => setUserId(null)}>
				change username
		</button>
		</div>
		<div style={{ position: "relative", width: "100%" }}>
			<button style={plusButton} onClick={newGame}>+</button>
			<button style={refreshButtonStyle}>Refresh</button>
		</div>
		<div style={gameListStyle}>
			{games.map(game => GameCard({ game }))}
		</div>
	</div >
)

export default ShowGames