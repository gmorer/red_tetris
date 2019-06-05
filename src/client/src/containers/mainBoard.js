import React, { useState } from 'react';
import Piece from './piece';
import PieceDejaPose from '../components/putedPieces';
import PiecePreview from '../components/piecePreview';
import Score from '../components/score';
import GameOver from '../components/gameOver'
import pieces from '../ressources/pieces.json';
import Previews from '../components/previews'
import { getDownPos, tabToPreview } from './utils'

const CUBE_SIZE = 2;
const COLUMNS_NUMBER = 10;
const LIGNE_NUMBER = 20;
const BLACKBLOCK = "#393939"

const board_style = {
	backgroundColor: 'grey',
	height: `${CUBE_SIZE * LIGNE_NUMBER}em`,
	width: `${CUBE_SIZE * COLUMNS_NUMBER}em`,
	position: "relative",
	overflow: "hidden"
};

const pageStyle = {
	textAlign: "center",
	backgroundImage: "url('bg.jpg')",
	backgroundSize: "cover",
	display: "flex",
	position: "relative",
	height: "100%",
	justifyContent: "space-around",
	paddingTop: "2em"
}

const scorePoints = [0, 40, 100, 300, 1200];

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

const Board = ({ piecesArray, gameName, tab, setTab, socket, state, setState, boards }) => {
	const [pieceIndex, setIndex] = useState(0);
	const [score, setScore] = useState(0);
	const finish_cb = (pos, piece) => {
		setTab(stateTab => {
			pos = getDownPos(pos, piece, stateTab)
			piece.position[pos.rotation].display.forEach((row, y) => {
				if (pos.y + y > stateTab.length) pos.y = stateTab.length - y - 1
				row.forEach((cube, x) => {
					if (cube !== ' ' && !(y + pos.y >= stateTab.length || y + pos.y < 0))
						stateTab[y + pos.y][x + pos.x] = piece.color;
				})
			});
			const deleted = deleteEmptyRow(stateTab);
			setIndex(getNextPiece(piecesArray, pieceIndex));
			if (!!deleted) {
				setScore(score + (scorePoints[deleted] || 0))
				if (deleted > 1)
					socket.emit('blackLine', { n: deleted - 1 })
			}
			socket.emit('boardChange', tabToPreview(stateTab))
			return stateTab.map(a => a);
		})
	};

	return (
		<div style={pageStyle}>
			<div style={{ flex: 1 }}>
				<h1 style={{ color: "white" }}>{gameName}</h1>
				<div style={{ display: "flex", justifyContent: "space-evenly" }}>
					<div style={board_style}>
						{state === 'playing' ?
							<Piece piece={pieces[piecesArray[pieceIndex]]} socket={socket} tab={tab} finish_cb={finish_cb} setState={setState} nextPiece={pieces[piecesArray[getNextPiece(piecesArray, pieceIndex)]]} /> :
							<GameOver />
						}
						<PieceDejaPose tab={tab} state={state} />
					</div>
					<div>
						<PiecePreview piece={pieces[piecesArray[getNextPiece(piecesArray, pieceIndex)]]} />
						<Score score={score} />
					</div>
				</div>
			</div>
			<div style={{ flex: 1, alignSelf: "center", height: "80%", overflowY: "auto" }}>
				<Previews previews={boards} />
			</div>
		</div>
	);
};

export default Board;
