import React from 'react';

const style_score = {
	height: "5em",
	width: "10em",
	backgroundColor: "grey"
}

const Score = ({ score }) => (

	<div style={style_score}>
		{score}
	</div>
)

export default Score;