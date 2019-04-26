import React, { useState } from 'react';
import './App.css';
import Piece from "./containers/piece"
import PieceDejaPose from './components/putedPieces'

import pieces from './ressources/pieces.json'

const CUBE_SIZE = 2;
const COLUMNS_NUMBER = 10;
const LIGNE_NUMBER = 20;

const board_style = {
	backgroundColor: "grey",
	height: `${CUBE_SIZE * LIGNE_NUMBER}em`,
	width: `${CUBE_SIZE * COLUMNS_NUMBER}em`,
	// heigth: "100%",
	// width: "100%",
	marginTop: "3em",
	marginLeft: "3em",
}

const twoDArray = (x, y, fill) => Array(x).fill(null).map(() => Array(y).fill(fill));

// const isTherePieces = (map) => map.some(columns => columns.some(a => a !== ' '))

const randomPiece = () => pieces[Math.floor(Math.random() * pieces.length)]

const App = () => {
	// console.log(pieces)
	const [tab, setTab] = useState(twoDArray(20, 10, ' '));
	const [piece, setPiece] = useState(randomPiece())
	const [update, forceUpdate] = useState(Math.random())
	const finish_cb = (pos, piece) => {
		console.log(piece)
		piece.position[pos.rotation].display.forEach((row, y) => row.forEach((cube, x) => {
			if (cube !== ' ') tab[y + pos.y][x + pos.x] = piece.color;
		}))
		setPiece(randomPiece())
		setTab(tab);
		forceUpdate(Math.random())
	}
	return (
		<div className="App">
			<div style={board_style}>
				<Piece piece={piece} tab={tab} finish_cb={finish_cb} />
				<PieceDejaPose tab={tab} update={update} />
			</div>
		</div>
	)
}
export default App;