import React from 'react';
import './App.css';
import MainBoard from './containers/mainBoard'
import SocketHandler from './containers/socketHandler'
import GameChooser from './containers/gamesChooser'
import pieces from './ressources/pieces.json';

const random_pieces_array = x =>
	Array(x)
		.fill(null)
		.map(_ => Math.floor(Math.random() * pieces.length));

const piecesArray = random_pieces_array(500);

const App = () => (
	<SocketHandler>
		{/* <MainBoard piecesArray={piecesArray} /> */}
		{(socket) =>
			<GameChooser socket={socket} />
		}
	</SocketHandler>
);

export default App;
