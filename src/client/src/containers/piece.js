import React, { useState, useEffect } from 'react'
import DisplayPiece from "../components/piece"

// PURE FUNCTIONS :O

const IsItBlock = (piece, pos, tab) => {
	return piece.position[pos.rotation].display.some((row, y) => row.some((cube, x) => {
		if (y + pos.y - piece.position[pos.rotation].hitbox.bot >= 20) {
			console.log('buggged')
			return true
		}
		if (cube !== ' ')
			return tab[y + pos.y < 0 ? 0 : y + pos.y][x + pos.x] !== ' ';
		return false
	}))
}

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
	for (let i = 0; ; i++) {
		if (pos.y + i - piece.position[pos.rotation].hitbox.bot >= 17 ||
			IsItBlock(piece, { y: pos.y + i, x: pos.x, rotation: pos.rotation }, tab)) {
			return ({ ...pos, y: pos.y + i - 1, space_trigered: true, last_interval: Date.now() })
		}
	}
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
	const [pos, setPose] = useState({ x: 3, y: 0 - piece.position[0].hitbox.top, last_interval: Date.now(), rotation: 0, space_trigered: false });
	if (IsItBlock(piece, pos, tab)) {
		// finish_cb(pos, piece)
		console.log('Hey wtf')
		console.log(tab)
		console.log(pos)
		socket.emit('changeState', 'gameOver')
		setState('gameOver')
	}
	const onKeyPress = ({ key }) => {
		if (!!actions[key]) {
			const newPos = actions[key](pos, piece, tab)
			if (!!newPos)
				setPose(newPos)
		}
	}

	// get executed at the end of the tick
	const callback = () => {
		if (downStop(pos, piece, tab)) {
			setPose({ rotation: 0, x: 3, y: 0 - nextPiece.position[0].hitbox.top, last_interval: Date.now() })
			finish_cb({ x: pos.x, y: pos.y, rotation: pos.rotation }, piece)
		} else {
			const newPos = goDown(pos, piece, tab)
			if (!!newPos) setPose(newPos)
		}
	}

	useEffect(() => {
		const interval = setInterval(callback, pos.last_interval + 500 - Date.now())
		window.addEventListener('keydown', onKeyPress);
		return () => {
			window.removeEventListener('keydown', onKeyPress)
			clearInterval(interval);
		}
	})
	return <DisplayPiece piece={piece} pos={pos} />
}

export default Piece