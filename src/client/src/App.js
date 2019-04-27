import React, { useState } from 'react';
import './App.css';
import Piece from "./containers/piece"
import PieceDejaPose from './components/putedPieces'
import PiecePreview from './components/piecePreview'

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
}

const twoDArray = (x, y, fill) => Array(x).fill(null).map(() => Array(y).fill(fill));

// const isTherePieces = (map) => map.some(columns => columns.some(a => a !== ' '))

const randomPiece = () => pieces[Math.floor(Math.random() * pieces.length)]

const random_pieces_array = x => Array(x).fill(null).map(_ => Math.floor(Math.random() * pieces.length))

const pieces_array = random_pieces_array(500);

const App = () => {
	// console.log(pieces)
	const [tab, setTab] = useState(twoDArray(20, 10, ' '));
	const [piece_index, setIndex] = useState(0);
	const [update, forceUpdate] = useState(Math.random())
	const finish_cb = (pos, piece) => {
		console.log(piece)
		piece.position[pos.rotation].display.forEach((row, y) => row.forEach((cube, x) => {
			if (cube !== ' ') tab[y + pos.y][x + pos.x] = piece.color;
		}))
		setIndex(piece_index + 1)
		setTab(tab);
		forceUpdate(Math.random())
	}
	return (
		<div className="App">
			<div style={board_style}>
				<Piece piece={pieces[pieces_array[piece_index]]} tab={tab} finish_cb={finish_cb} />
				<PieceDejaPose tab={tab} update={update} />
			</div>
			<PiecePreview piece={pieces[pieces_array[piece_index + 1]]} />
		</div>
	)
}
export default App;