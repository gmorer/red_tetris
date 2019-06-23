import React, { useState, useEffect } from 'react'
import DisplayPiece from "../components/piece"
import { IsItBlock, getUpPos } from './utils'

// PURE FUNCTIONS :O

const downStop = (pos, piece, tab) => {
	if ((pos.y - piece.position[pos.rotation].hitbox.bot >= 16 ||
		IsItBlock(piece, { y: pos.y + 1, x: pos.x, rotation: pos.rotation }, tab)))
		return true
	else return false
}

const goLeft = (pos, piece, tab) => {
	if (pos.x + piece.position[pos.rotation].hitbox.left <= 0) return null
	if (IsItBlock(piece, { x: pos.x - 1, y: pos.y, rotation: pos.rotation }, tab)) return
	return ({ ...pos, x: pos.x - 1 })
}

const goRight = (pos, piece, tab) => {
	if (pos.x - piece.position[pos.rotation].hitbox.right >= 6) return null
	if (IsItBlock(piece, { x: pos.x + 1, y: pos.y, rotation: pos.rotation }, tab)) return
	return ({ ...pos, x: pos.x + 1 })
}

const goDown = (pos, piece, tab) => {
	if (downStop(pos, piece, tab))
		return null
	else
		return ({ ...pos, y: pos.y + 1, last_interval: Date.now() })
}

const goSpace = (pos, piece, tab) => {
	if (pos.space_trigered) return null
	return ({ ...getUpPos(pos, piece, tab), space_trigered: true, last_interval: Date.now() })
}

const rotate = (pos, piece, tab) => {
	if (!IsItBlock(piece, { ...pos, rotation: (pos.rotation + 1) % piece.position.length }, tab))
		return ({ ...pos, rotation: (pos.rotation + 1) % piece.position.length })
}

const actions = {
	'ArrowLeft': goLeft,
	'ArrowRight': goRight,
	'ArrowDown': goDown,
	'ArrowUp': rotate,
	' ': goSpace
}

// End of the pure function :(

const Piece = ({ piece, finish_cb, tab, setState, nextPiece, socket }) => {
	const [pos, setPose] = useState({
		x: 3,
		y: 0 - piece.position[0].hitbox.top,
		last_interval: Date.now(),
		rotation: 0,
		space_trigered: false
	});

	if (IsItBlock(piece, pos, tab) && pos.y < 1) {
		if (pos.y < 1) {
			setState('gameOver')
		}
	}

	// get executed at the end of the tick
	const callback = () => {
		if (downStop(pos, piece, tab)) {
			setPose({ rotation: 0, x: 3, y: 0 - nextPiece.position[0].hitbox.top, last_interval: Date.now() })
			finish_cb(pos, piece)
		} else {
			setPose(pos => goDown(pos, piece, tab) || pos)
		}
	}

	useEffect(() => {

		const interval = setInterval(callback, pos.last_interval + 500 - Date.now())

		const onKeyPress = ({ key }) => {
			if (!!actions[key]) {
				setPose(pos => {
					const newPos = actions[key](pos, piece, tab)
					if (!!newPos) {
						clearInterval(interval)
						return (newPos)
					}
					return pos
				})
			}
		}

		window.addEventListener('keydown', onKeyPress);
		return () => {
			clearInterval(interval);
			window.removeEventListener('keydown', onKeyPress)
		}
	})
	return <DisplayPiece piece={piece} pos={pos} />
}

export default Piece