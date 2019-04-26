import React, { useState, useEffect } from 'react'
import DisplayPiece from "../components/piece"

const goLeft = (pos, hitbox, setPose) => {
	if (pos.x + hitbox.left <= 0) return
	setPose({ x: pos.x - 1, y: pos.y })
}

const goRight = (pos, hitbox, setPose) => {
	if (pos.x - hitbox.right >= 6) return
	setPose({ x: pos.x + 1, y: pos.y })
}

const Piece = ({ piece }) => {
	const [pos, setPose] = useState({ x: 3, y: 0 });
	const onKeyPress = ({ key }) => {
		console.log(pos)
		switch (key) {
			case 'ArrowUp':
				setPose({ x: pos.x, y: pos.y - 1 })
				break;
			case 'ArrowLeft':
				goLeft(pos, piece.hitbox, setPose)
				break;
			case 'ArrowRight':
				goRight(pos, piece.hitbox, setPose)
				break;
			case 'ArrowDown':
				setPose({ x: pos.x, y: pos.y + 1 })
				break;
		}

	}
	useEffect(() => {
		window.addEventListener('keydown', onKeyPress);
		return () => window.removeEventListener('keydown', onKeyPress)
	})
	return <DisplayPiece piece={piece} pos={pos} />
}

export default Piece