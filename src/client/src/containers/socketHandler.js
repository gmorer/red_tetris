import React, { useState } from 'react'
import openSocket from 'socket.io-client';
import ShowGames from '../components/showGames'

const PORT = 1337

const URL = 'http://localhost'

/*
state incatif -> waiting -> ready -> playing -> gameOver
 state {
	 state,
	 games,
 }
 callServer('')
*/

const socketOn = (socket, state, setState) => {
	socket.on('getGames', ({ games }) => setState({ ...state, games }))
}

const Handler = ({ socket }) => {
	const [state, setState] = useState({ state: "inactive", games: [], name: null })
	const setStatePlus = (newState) => setState({ ...state, ...newState })
	socketOn(socket, state, setState)
	switch (state.state) {
		case "inactive": return <ShowGames {...state} socket={socket} setState={setStatePlus} />
		default: return <div>lol</div>
	}
}

const Connector = () => {
	const socket = openSocket(`${URL}:${PORT}`);
	socket.on('message', console.log)
	socket.emit('message', { a: 'mdr' })
	return <Handler socket={socket} />
}

export default Connector