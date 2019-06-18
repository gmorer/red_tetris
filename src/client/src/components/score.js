import React from 'react';

const style_score = {
	height: "5em",
	width: "10em",
	backgroundColor: "rgba(159, 35, 58, 0.5)"
}

const Score = ({ score }) => (

	<div style={style_score}>
		Score : {score}
	</div>
)

export default Score;