import React, { useState, useEffect } from 'react';
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

const pageStyle = {
	textAlign: "center",
	backgroundImage: "url('bg2.jpg')",
	backgroundSize: "100% 100%",
	backgroundRepeat: "no-repeat",
	width: "100%",
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

	useEffect(() => {
		const board = (document.getElementById('mainBoard'))
		board.setAttribute("style",
			`width:${board.clientHeight / 2}px;background-color:rgba(159, 35, 58, 0.5);height:80%;position:relative;overflow:hidden`
		);
	})


	return (
		<div style={pageStyle}>
			<div style={{ flex: 1 }}>
				<h1 style={{ color: "black" }}>{gameName}</h1>
				<div style={{ display: "flex", justifyContent: "space-evenly", height: "100%" }}>
					<div id="mainBoard">
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
