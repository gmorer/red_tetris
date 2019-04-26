import React from 'react';
import './App.css';
import Piece from "./containers/piece"

const CUBE_SIZE = 2;
const COLUMNS_NUMBER = 10;
const LIGNE_NUMBER = 20;

const board_style = {
	backgroundColor: "grey",
	height: `${CUBE_SIZE * LIGNE_NUMBER}em`,
	width: `${CUBE_SIZE * COLUMNS_NUMBER}em`,
	marginTop: "3em",
	marginLeft: "3em",
}

const my_piece = {
	color: 'red',
	display: [
		['x', ' ', ' ', ' '],
		['x', ' ', ' ', ' '],
		['x', ' ', ' ', ' '],
		['x', ' ', ' ', ' '],
	],
	hitbox: {
		left: 0,
		right: 3,
		top: 1,
		bot: 2,
	}
}

const App = () => (
	<div className="App">

		<div style={board_style}>
			<Piece piece={my_piece} />

		</div>
	</div>
)

export default App;