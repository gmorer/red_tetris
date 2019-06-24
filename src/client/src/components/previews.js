import React from 'react'
import PutedPieces from './putedPieces'
import GameOver from './gameOver'

const previewStyle = {
	marginTop: "2em",
	marginBot: "2em",
	marginLeft: "3em",
	marginRigth: "3em",
	color: "white",
	position: "relative"
}

const mainStyle = {
	display: "flex",
	justifyContent: "space-around",
	flexFlow: "row wrap",
	alignSelf: "center",
	marginTop: "5em",
	marginRight: "3em"
}

const isGameOver = baord => baord[0].some(block => block !== ' ')

const MiniBoard = ({ board }) => (
	<div style={{ width: "12em", height: "24em", backgroundColor: "white" }}>
		{isGameOver(board) ? <GameOver style={{ height: "24em" }} /> : null}
		<PutedPieces tab={board} mode="dark" />
	</div>
)

const Previews = ({ previews }) => (
	<div style={mainStyle}>
		{previews.map((preview, index) => (
			<div key={index} style={previewStyle}>
				<MiniBoard board={preview.board} />
				{preview.name}
			</div>
		))}
	</div>
)

export default Previews