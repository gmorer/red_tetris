import React from 'react';
import Block from './block'

const piece_style = state => ({
	width: "100%",
	height: "100%",
	marginTop: state === 'gameOver' ? null : "-40%",
	display: "flex",
	flexDirection: "column"
})

const column_style = {
	width: "100%",
	height: "5%",
	display: "flex",
	flexDirection: "row"
}

const cube_style = actual => ({
	width: "10%",
	height: "100%",
	backgroundColor: actual !== ' ' ? actual : 'transparent'
})

const PutedPieces = ({ tab, state, mode }) => (
	<div style={piece_style(state)}>
		{tab ? tab.map((column, index) => (
			<div key={index} style={column_style}>
				{column.map((actual, index) => {
					if (actual === ' ')
						return <div key={index} style={cube_style(actual)} />
					else if (mode === "dark") return <div key={index} style={cube_style("black")} />
					else return <Block key={index} color={actual} height="100%" width="10%" />
				}
				)}
			</div>
		)) : null}
	</div>
)

export default PutedPieces