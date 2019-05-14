import React, { useState, useEffect } from 'react'
import openSocket from 'socket.io-client';
import ShowGames from '../components/showGames'
import LoadingRoom from '../components/loadingRoom'
import MainBoard from './mainBoard'

const PORT = 1337
const URL = 'http://localhost'
const COLUMNS_NUMBER = 10;
const LIGNE_NUMBER = 20;

const BLACKBLOCK = "#393939"

const twoDArray = (x, y, fill) =>
	Array(x)
		.fill(null)
		.map(() => Array(y).fill(fill));

const Handler = ({ socket }) => {
	const [name, setName] = useState(null)
	const [state, setState] = useState("inactive")
	const [players, setPlayers] = useState([])
	const [games, setGames] = useState([])
	const [gameName, setGameName] = useState(null)
	const [piecesArray, setPiecesArray] = useState(null)
	let [messages, setMessage] = useState(new Array())
	const [tab, setTab] = useState(twoDArray(LIGNE_NUMBER, COLUMNS_NUMBER, ' '))
	useEffect(() => {
		socket.on('getGames', setGames)
		socket.on('changeState', setState)
		socket.on('playersList', setPlayers)
		socket.on('piecesArray', setPiecesArray)
		socket.on('getMessages', newMessages => {
			setMessage(newMessages);
			messages = newMessages
			socket.on('newMessage', args => {
				const newNewMessages = messages.concat([args])
				messages = newNewMessages;
				setMessage(newNewMessages);
			})
		})
		socket.on('blackLine', n => {
			tab.splice(0, n);
			for (let i = 0; i < n; i++)
				tab.push(Array(COLUMNS_NUMBER).fill(BLACKBLOCK))
			setTab(tab)
		})
	}, [socket])
	// console.log('piecesArray:', piecesArray)
	// return <LoadingRoom socket={socket} setState={setState} players={players} gameName={gameName} messages={messages} />


	switch (state) {
		case "inactive":
			return <ShowGames games={games} name={name} setName={setName} setGameName={setGameName} socket={socket} />
		case "ready":
		case "loading": return <LoadingRoom socket={socket} setState={setState} players={players} gameName={gameName} messages={messages} name={name} />
		case "gameOver":
		case "playing": return <MainBoard piecesArray={piecesArray} gameName={gameName} players={players} tab={tab} setTab={setTab} socket={socket} setState={setState} state={state} setPiecesArray={setPiecesArray} />
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