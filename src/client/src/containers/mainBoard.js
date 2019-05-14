import React, { useState } from 'react';
import Piece from './piece';
import PieceDejaPose from '../components/putedPieces';
import PiecePreview from '../components/piecePreview';
import Score from '../components/score';
import GameOver from '../components/gameOver'
import pieces from '../ressources/pieces.json';

const CUBE_SIZE = 2;
const COLUMNS_NUMBER = 10;
const LIGNE_NUMBER = 20;
const BLACKBLOCK = "#393939"

const board_style = {
	backgroundColor: 'grey',
	height: `${CUBE_SIZE * LIGNE_NUMBER}em`,
	width: `${CUBE_SIZE * COLUMNS_NUMBER}em`,
	position: "relative"
	// heigth: "100%",
	// width: "100%",
};

const twoDArray = (x, y, fill) =>
	Array(x)
		.fill(null)
		.map(() => Array(y).fill(fill));

const pageStyle = {
	backgroundColor: "blue",
	display: "flex",
	position: "relative",
	height: "100%",
	justifyContent: "space-around",
	paddingTop: "2em"
}

const scorePoints = [0, 40, 100, 300, 1200];

const isGameOver = tab => tab[0].some(n => n !== ' ')

const deleteEmptyRow = tab => {
	const toRemove = [];
	tab.forEach((row, index) => {
		if (!row.includes(' ') && !row.includes(BLACKBLOCK))
			toRemove.push(index);
	});
	toRemove.forEach(index => {
		tab.splice(index, 1);
		tab.unshift(Array(COLUMNS_NUMBER).fill(' '));
	});
	return toRemove.length
};

const getNextPiece = (array, index) =>
	index === (array.length - 1) ? 0 : index + 1

const Board = ({ piecesArray, gameName, tab, setTab, socket, state, setState }) => {
	const [pieceIndex, setIndex] = useState(0);
	const [score, setScore] = useState(0);
	const finish_cb = (pos, piece) => {
		piece.position[pos.rotation].display.forEach((row, y) => {
			if (pos.y + y > tab.length) pos.y = tab.length - y - 1
			row.forEach((cube, x) => {
				if (cube !== ' ' && !(y + pos.y >= tab.length || y + pos.y < 0))
					tab[y + pos.y][x + pos.x] = piece.color;
			})
		}
		);
		setIndex(getNextPiece(piecesArray, pieceIndex));
		const deleted = deleteEmptyRow(tab);
		if (isGameOver(tab)) {
			setState('gameOver')
			socket.emit('changeState', 'gameOver')
			setIndex(0)
			setTab(twoDArray(LIGNE_NUMBER, COLUMNS_NUMBER, ' '))
			return
		}
		if (!!deleted) {
			setScore(score + scorePoints[deleted])
			if (deleted > 1)
				socket.emit('blackLine', { n: deleted - 1 })
		}
		setTab(tab);
	};
	return (
		<div style={pageStyle}>
			<h1>{gameName}</h1>
			<div style={board_style}>
				{state === 'playing' ?
					<Piece piece={pieces[piecesArray[pieceIndex]]} tab={tab} finish_cb={finish_cb} /> :
					<GameOver />
				}
				<PieceDejaPose tab={tab} state={state} />
			</div>
			<div>
				<PiecePreview piece={pieces[piecesArray[getNextPiece(piecesArray, pieceIndex)]]} />
				<Score score={score} />
			</div>
		</div>
	);
};

export default Board;
