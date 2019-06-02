import React, { useState, useEffect } from 'react'
import openSocket from 'socket.io-client';
import ShowGames from '../components/showGames'
import LoadingRoom from '../components/loadingRoom'
import MainBoard from './mainBoard'
import { tabToPreview } from './utils'

const PORT = 8080
const URL = process.env.NODE_ENV === 'production' ? '/' : `localhost:${PORT}`;
const COLUMNS_NUMBER = 10;
const LIGNE_NUMBER = 20;

const BLACKBLOCK = "#393939"

const twoDArray = (x, y, fill) =>
	Array(x)
		.fill(null)
		.map(() => Array(y).fill(fill));

const getPage = state => {
	switch (state) {
		case "inactive":
			return ShowGames
		case "ready":
		case "loading": return LoadingRoom
		case 'gameOver':
		case "playing": return MainBoard
		default: return null
	}
}

const Handler = ({ socket, defaultGameName, defaultName }) => {
	const [name, setName] = useState(defaultName)
	const [state, setState] = useState("inactive")
	const [players, setPlayers] = useState([])
	const [games, setGames] = useState([])
	const [gameName, setGameName] = useState(defaultGameName)
	const [piecesArray, setPiecesArray] = useState(null)
	let [tab, setTab] = useState(twoDArray(LIGNE_NUMBER, COLUMNS_NUMBER, ' '))
	let [boards, setBoards] = useState([])
	let [messages, setMessage] = useState([])

	const addBackline = n => {
		console.log('tab before:', tab)
		tab.splice(0, n);
		for (let i = 0; i < n; i++)
			tab.push(Array(COLUMNS_NUMBER).fill(BLACKBLOCK))
		console.log('tab after: ', tab)
		setTab(tab.map(a => a))
		socket.emit('boardChange', tabToPreview(tab))
	}

	useEffect(() => {
		if (defaultGameName && defaultName) {
			socket.emit('hideConnect', { gameId: gameName, playerId: name }, res => (
				!res ? alert("Error, cannot join/create the game") : setState("loading")
			))
		}
		socket.on('blackLine', addBackline)
		socket.on('getGames', setGames)
		socket.on('playersList', newPlayers => {
			console.log(newPlayers)
			setBoards(newPlayers.filter(player => player.name !== name).map(player => ({ board: twoDArray(LIGNE_NUMBER, COLUMNS_NUMBER, ' '), name: player.name })))
			setPlayers(newPlayers)
		})
		socket.on('piecesArray', setPiecesArray)
		socket.on('changeState', state => {
			if (state === 'playing') {
				tab = twoDArray(LIGNE_NUMBER, COLUMNS_NUMBER, ' ')  // eslint-disable-line
				setTab(tab)
				// boards = []  // eslint-disable-line
			}
			setState(state)
		})
		socket.on('getMessages', args => {
			setMessage(args);
			messages = args; // eslint-disable-line
		})
		socket.on('newMessage', args => {
			const newMessages = messages.concat([args])
			messages = newMessages;
			setMessage(newMessages);
		})
		socket.on('newPlayerBoard', ({ board, name }) => {
			const updateIndex = boards.findIndex(board => board.name === name)
			let updatedBoards = null
			if (updateIndex === -1)
				updatedBoards = boards.concat([{ board, name }])
			else
				updatedBoards = boards.map((entry, index) => {
					if (index === updateIndex) return { board, name }
					return entry
				})
			setBoards(updatedBoards)
			console.log(updatedBoards)
			boards = updatedBoards; // eslint-disable-line
		})
	}, [])
	const Page = getPage(state)
	return <Page
		piecesArray={piecesArray}
		gameName={gameName}
		players={players}
		tab={tab}
		games={games}
		name={name}
		messages={messages}
		setGameName={setGameName}
		setName={setName}
		setTab={a => {
			tab = a
			setTab(a)
		}}
		socket={socket}
		setState={setState}
		state={state}
		setPiecesArray={setPiecesArray}
		setBoards={setBoards}
		boards={boards}
	/>
}
const Connector = () => {
	const socket = openSocket(URL);
	const regexResult = /\#(.*)\[(.*)\]/.exec(window.location.hash) // eslint-disable-line
	if (!!regexResult) {
		return <Handler
			socket={socket}
			defaultName={regexResult[1].trim() || null}
			defaultGameName={regexResult[2].trim() || null}
		/>
	}
	return <Handler socket={socket} />
}

export default Connector