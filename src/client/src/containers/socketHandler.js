import React, { useState, useEffect } from 'react'
import openSocket from 'socket.io-client';
import ShowGames from '../components/showGames'
import LoadingRoom from '../components/loadingRoom'
import MainBoard from './mainBoard'

const PORT = 1337

const URL = 'http://localhost'

/*
state incatif -> waiting -> ready -> playing -> gameOver
Commming from the server:
	 state,
	 

 callServer('')
*/

const Handler = ({ socket }) => {
	const [name, setName] = useState(null)
	const [state, setState] = useState("inactive")
	const [players, setPlayers] = useState([])
	const [games, setGames] = useState([])
	const [gameName, setGameName] = useState(null)
	const [piecesArray, setPiecesArray] = useState(null)
	const [messages, setMessage] = useState([])
	useEffect(() => {
		// socketOn(socket, state, setState)
		socket.on('getGames', setGames)
		socket.on('changeState', setState)
		socket.on('playersList', setPlayers)
		socket.on('piecesArray', setPiecesArray)
		socket.on('piecesArray', console.log)
		socket.on('newMessage', message => { messages.push(message); setMessage(messages); console.log(messages) })
	}, [])
	console.log('piecesArray:', piecesArray)
	// return <LoadingRoom socket={socket} setState={setState} players={players} gameName={gameName} messages={messages} />

	switch (state) {
		case "inactive":
			return <ShowGames games={games} name={name} setName={setName} setGameName={setGameName} socket={socket} />
		case "ready":
		case "loading": return <LoadingRoom socket={socket} setState={setState} players={players} gameName={gameName} messages={messages} />
		case "playing": return <MainBoard piecesArray={piecesArray} gameName={gameName} players={players} />
		default: return null
	}
}
const Connector = () => {
	const socket = openSocket(`${URL}:${PORT}`);
	socket.on('message', console.log)
	socket.emit('message', { a: 'mdr' })
	return <Handler socket={socket} />
}

export default Connector