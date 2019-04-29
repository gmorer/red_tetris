import React, { useState, useEffect } from 'react'
import DisplayPiece from "../components/piece"

const IsItBlock = (piece, pos, tab) => {
	return piece.position[pos.rotation].display.some((row, y) => row.some((cube, x) => {
		if (y + pos.y >= 20) return false // hmmm
		if (cube !== ' ')
			return tab[y + pos.y][x + pos.x] !== ' ';
		return false
	}))
}

const goLeft = (pos, hitbox, setPose, piece, tab) => {
	if (pos.x + hitbox.left <= 0) return
	if (IsItBlock(piece, { x: pos.x - 1, y: pos.y, rotation: pos.rotation }, tab)) return
	setPose({ ...pos, x: pos.x - 1 })
}

const goRight = (pos, hitbox, setPose, piece, tab) => {
	if (pos.x - hitbox.right >= 6) return
	if (IsItBlock(piece, { x: pos.x + 1, y: pos.y, rotation: pos.rotation }, tab)) return
	setPose({ ...pos, x: pos.x + 1 })
}

const goDown = (pos, piece, setPose, finish_cb, tab) => {
	if (pos.y - piece.position[pos.rotation].hitbox.bot >= 16 || pos.space_trigered ||
		IsItBlock(piece, { y: pos.y + 1, x: pos.x, rotation: pos.rotation }, tab)) {
		setPose({ rotation: 0, x: 3, y: 0, last_interval: Date.now() })
		finish_cb({ x: pos.x, y: pos.y, rotation: pos.rotation }, piece)
	} else
		setPose({ ...pos, y: pos.y + 1, last_interval: Date.now() })
}

const goSpace = (pos, piece, setPose, finish_cb, tab) => {
	if (pos.space_trigered) return
	for (let i = pos.y; ; i++) {
		if (pos.y + i - piece.position[pos.rotation].hitbox.bot >= 17 ||
			IsItBlock(piece, { y: pos.y + i, x: pos.x, rotation: pos.rotation }, tab)) {
			return setPose({ ...pos, y: pos.y + i - 1, space_trigered: true })
			// setPose({ rotation: 0, x: 3, y: 0, last_interval: Date.now() })
			// return finish_cb({ x: pos.x, y: pos.y + i - 1, rotation: pos.rotation }, piece)
		}
	}
}

const rotate = (pos, piece, setPose, tab) => {
	if (!IsItBlock(piece, { ...pos, rotation: (pos.rotation + 1) % piece.position.length }, tab))
		setPose({ ...pos, rotation: (pos.rotation + 1) % piece.position.length })
}

const Piece = ({ piece, finish_cb, tab }) => {
	const [pos, setPose] = useState({ x: 3, y: 0 - piece.position[0].hitbox.top, last_interval: Date.now(), rotation: 0, space_trigered: false });
	const onKeyPress = ({ key }) => {
		console.log(key)
		switch (key) {
			case 'ArrowLeft':
				return goLeft(pos, piece.position[pos.rotation].hitbox, setPose, piece, tab)
			case 'ArrowRight':
				return goRight(pos, piece.position[pos.rotation].hitbox, setPose, piece, tab)
			case 'ArrowDown':
				return goDown(pos, piece, setPose, finish_cb, tab)
			case 'ArrowUp':
				return rotate(pos, piece, setPose, tab)
			case ' ':
				return goSpace(pos, piece, setPose, finish_cb, tab)
			default: return
		}
	}
	useEffect(() => {
		window.addEventListener('keydown', onKeyPress);
		const interval = setInterval(() => goDown(pos, piece, setPose, finish_cb, tab), pos.last_interval + 500 - Date.now())
		return () => {
			clearInterval(interval);
			window.removeEventListener('keydown', onKeyPress)
		}
	})
	return <DisplayPiece piece={piece} pos={pos} />
}

export default Piece