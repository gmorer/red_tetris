import React, { useState } from 'react';
import './App.css';
import Piece from './containers/piece';
import PieceDejaPose from './components/putedPieces';
import PiecePreview from './components/piecePreview';
import Score from './components/score';

import pieces from './ressources/pieces.json';

const CUBE_SIZE = 2;
const COLUMNS_NUMBER = 10;
const LIGNE_NUMBER = 20;

const board_style = {
	backgroundColor: 'grey',
	height: `${CUBE_SIZE * LIGNE_NUMBER}em`,
	width: `${CUBE_SIZE * COLUMNS_NUMBER}em`,
	// heigth: "100%",
	// width: "100%",
};

const twoDArray = (x, y, fill) =>
	Array(x)
		.fill(null)
		.map(() => Array(y).fill(fill));

// const isTherePieces = (map) => map.some(columns => columns.some(a => a !== ' '))

const randomPiece = () => pieces[Math.floor(Math.random() * pieces.length)];

const random_pieces_array = x =>
	Array(x)
		.fill(null)
		.map(_ => Math.floor(Math.random() * pieces.length));

const pieces_array = random_pieces_array(500);

// const delete_completed_row = tab => {
// 	var row_to_delete = [];

// 	tab.map((columns, i) => {
// 		if (!columns.includes(' ')) return row_to_delete.push(i);
// 		else return null;
// 	});

// 	row_to_delete.map(e => {
// 		for (var i = 0; i < tab[e].length; i++) {
// 			tab[e][i] = ' ';
// 		}
// 	});
// };

const scorePoints = [0, 40, 100, 300, 1200];

const delete_empty_row = tab => {
	const to_remove = [];
	tab.forEach((row, index) => {
		if (!row.includes(' ')) to_remove.push(index);
	});
	to_remove.forEach(index => {
		tab.splice(index, 1);
		tab.unshift(Array(10).fill(' '));
	});
	return to_remove.length
};

const App = () => {
	// console.log(pieces.length)
	const [tab, setTab] = useState(twoDArray(20, 10, ' '));
	const [piece_index, setIndex] = useState(0);
	const [update, forceUpdate] = useState(Math.random());
	const [score, setScore] = useState(0);
	const finish_cb = (pos, piece) => {
		// console.log(piece)
		piece.position[pos.rotation].display.forEach((row, y) => {
			if (pos.y + y > tab.length) pos.y = tab.length - y - 1
			row.forEach((cube, x) => {
				if (cube !== ' ') console.log('y:', y, 'pos.y:', pos.y)
				if (cube !== ' ') {
					if (y + pos.y >= tab.length || y + pos.y < 0) return
					if (y + pos.y >= tab.length) y = tab.length - pos.y - 1
					console.log('after', 'y:', y, 'pos.y:', pos.y)
					tab[y + pos.y][x + pos.x] = piece.color;
				}
			})
		}
		);
		setIndex(piece_index === (pieces_array.length - 1) ? 0 : piece_index + 1);
		const deleted = delete_empty_row(tab);
		if (!!deleted) setScore(score + scorePoints[deleted])
		// delete_completed_row(tab);
		//foncton qui check si il y a une
		setTab(tab);
		forceUpdate(Math.random());
	};
	return (
		<div className="App">
			<div style={board_style}>
				<Piece piece={pieces[pieces_array[piece_index]]} tab={tab} finish_cb={finish_cb} />
				<PieceDejaPose tab={tab} update={update} />
			</div>
			<div>
				<PiecePreview piece={pieces[pieces_array[piece_index === (pieces_array.length - 1) ? 0 : piece_index + 1]]} />
				<Score score={score} />
			</div>
		</div>
	);
};
export default App;
