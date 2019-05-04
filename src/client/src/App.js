import React from 'react';
import './App.css';
import MainBoard from './containers/mainBoard'
import SocketHandler from './containers/socketHandler'
import pieces from './ressources/pieces.json';

const random_pieces_array = x =>
	Array(x)
		.fill(null)
		.map(_ => Math.floor(Math.random() * pieces.length));

const piecesArray = random_pieces_array(500);

const App = () => (
	// <MainBoard piecesArray={piecesArray} />
	<SocketHandler />
);

export default App;
