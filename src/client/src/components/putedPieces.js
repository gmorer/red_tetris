import React from 'react';
import Block from './block'

const piece_style = ({
	width: "100%",
	height: "100%",
	marginTop: "-40%",
	display: "flex",
	flexDirection: "column"
})

const column_style = {
	width: "100%",
	height: "5%",
	display: "flex",
	flexDirection: "row"
}

const cube_style = (actual) => ({
	width: "10%",
	height: "100%",
	backgroundColor: actual !== ' ' ? actual : 'transparent'
	// border: "2px solid black"
})

const PutedPieces = ({ tab }) => (
	<div style={piece_style}>
		{tab.map((column, index) => (
			<div key={index} style={column_style}>
				{column.map((actual, index) => {
					if (actual === ' ')
						return <div key={index} style={cube_style(actual)} />
					else return <Block key={index} color={actual} height="100%" width="10%" />
				}
				)}
			</div>
		))}
	</div>
)

export default PutedPieces