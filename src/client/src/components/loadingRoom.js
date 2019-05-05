import React from "react"

const players = ["a", "b", "c", "d"]

const mainStyle = {
	height: "100%",
	backgroundColor: "blue"
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

const PlayerCard = ({ id, no }, index) => (
	<div style={entryStyle} key={index}>
		<div style={{ height: "60%" }}>
			<h2 style={{ marginTop: "5%" }}>{id}</h2>
			<br />
			{`${no} player${no > 1 ? 's' : ''}`}
		</div>
		<button style={{ height: "35%", width: "100%", border: "none", outline: "none", cursor: "pointer" }}>Join</button>
	</div>
)

const LoadingRoom = ({ }) => (
	<div style={mainStyle}>
		<button style={{ margin: "1em" }}>Exit Room</button>
		<div style={{ display: "flex" }}>
			<div style={{ width: "30%", backgroundColor: "grey" }}>Tchat</div>
			<div style={{ width: "40%" }}>
				{players.map(PlayerCard)}
			</div>
		</div>
		<button>Ready</button>
	</div>
)

export default LoadingRoom