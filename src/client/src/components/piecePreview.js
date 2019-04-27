import React from 'react';
import Piece from './piece'

const PreviewStyle = {
	height: "10em",
	width: "10em",
	backgroundColor: "grey"
}

const pos = {x: 0, y: 0, rotation: 0}

const PiecePreview = ({ piece }) => (
	<div style={PreviewStyle}>
		<Piece piece={piece} pos={pos} isPreview={true}/>
	</div>
)

export default PiecePreview;