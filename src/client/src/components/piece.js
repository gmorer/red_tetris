import React from 'react';

const piece_style = pos => ({
	position: "relative",
	left: `${pos.x * 10}%`,
	top: `${pos.y * 5}%`,
	width: "40%",
	height: "20%",
	display: "flex",
	flexDirection: "column"
})

const column_style = {
	width: "100%",
	height: "25%",
	display: "flex",
	flexDirection: "row"
}

const cube_style = (actual, color) => ({
	width: "25%",
	height: "100%",
	backgroundColor: actual !== ' ' ? color : 'transparent'
})

const Piece = ({ piece, pos }) => (
	<div style={piece_style(pos)}>
		{piece.position[pos.rotation].display.map((column, index) => (
			<div key={index} style={column_style}>
				{column.map((actual, index) =>
					<div key={index} style={cube_style(actual, piece.color)} />
				)}
			</div>
		))}
	</div>
)

export default Piece