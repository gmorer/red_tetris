import React from 'react';
import SocketHandler from './containers/socketHandler'

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const mainStyle = {
	height: "100%",
	backgroundImage: "url('bg2.jpg')",
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	textAlign: "center",
	width: "100%"
}

const App = () => (
	<div style={mainStyle}>
		<SocketHandler />
	</div>
);

export default App;
