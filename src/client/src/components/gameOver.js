import React from 'react'

const mainStyle = {
	width: "100%",
	height: "100%",
	textAlign: "center",
	position: "absolute",
	zIndex: "99",
	backgroundColor: "rgba(0, 0, 0,  0.5)"
}

const GameOver = () => (
	<div style={mainStyle}>
		<h3 style={{ color: "red", fontSize: "3em", marginTop: "50%" }}>
			Game
			<br />
			Over
		</h3>
	</div >
)

export default GameOver