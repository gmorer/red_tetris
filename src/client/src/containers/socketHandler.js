import React, { useState } from 'react'
import openSocket from 'socket.io-client';
import ShowGames from '../components/showGames'
import LoadingRoom from '../components/loadingRoom'

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

const socketOn = (socket, oldState, setState) => {
	socket.on('getGames', ({ games }) => setState({ ...oldState, games }))
	socket.on('ChangeState', ({ state }) => setState({ ...oldState, state }))
}

const Handler = ({ socket }) => {
	const [state, setState] = useState({ state: "inactive", games: [], name: null })
	const setStatePlus = (newState) => setState({ ...state, ...newState })
	socketOn(socket, state, setState)
	let Display = <div>Lool</div>
	switch (state.state) {
		case "inactive":
			Display = ShowGames
			break
		case "loading":
			Display = LoadingRoom
			break
		default: break
	}
	// To remove
	Display = LoadingRoom
	return <Display {...state} socket={socket} setState={setStatePlus} />
}

const Connector = () => {
	const socket = openSocket(`${URL}:${PORT}`);
	socket.on('message', console.log)
	socket.emit('message', { a: 'mdr' })
	return <Handler socket={socket} />
}

export default Connector