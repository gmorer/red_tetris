import React, { useState, useEffect, useReducer } from 'react'
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

const messagesReducer = (messages, args) => {
	if (Array.isArray(args))
		return args
	return messages.concat([args])
}

const boardReducer = (boards, { board, name, init }) => {
	if (!!init) return []
	const updateIndex = boards.findIndex(board => board.name === name)
	if (updateIndex === -1)
		return boards.concat([{ board, name }])
	else
		return boards.map((entry, index) => {
			if (index === updateIndex) return { board, name }
			return entry
		})
}

const stateReducer = (setTab, setBoards) => (_, newState) => {
	if (newState === 'playing') {
		setTab(twoDArray(LIGNE_NUMBER, COLUMNS_NUMBER, ' '))
		setBoards({ init: true })
	}
	return newState
}

const addBackline = (socket, setTab) => n => {
	setTab(tab => {
		tab.splice(0, n);
		for (let i = 0; i < n; i++)
			tab.push(Array(COLUMNS_NUMBER).fill(BLACKBLOCK))
		socket.emit('boardChange', tabToPreview(tab))
		return tab.map(a => a) // w8
	})
}

const Handler = ({ socket, defaultGameName, defaultName }) => {
	const [name, setName] = useState(defaultName)
	const [games, setGames] = useState([])
	const [gameName, setGameName] = useState(defaultGameName)
	const [piecesArray, setPiecesArray] = useState(null)
	const [tab, setTab] = useState(twoDArray(LIGNE_NUMBER, COLUMNS_NUMBER, ' '))
	const [boards, setBoards] = useReducer(boardReducer, [])
	const [messages, setMessages] = useReducer(messagesReducer, [])
	const [state, setState] = useReducer(stateReducer(setTab, setBoards), "inactive")

	const playersReducer = (_, newPlayers) => {
		setBoards(newPlayers
			.filter(player => player.name !== name)
			.map(player => ({ board: twoDArray(LIGNE_NUMBER, COLUMNS_NUMBER, ' '), name: player.name })))
		return newPlayers
	}

	const [players, setPlayers] = useReducer(playersReducer, [])

	useEffect(() => {
		if (defaultGameName && defaultName) {
			socket.emit('hideConnect', { gameId: defaultGameName, playerId: defaultName }, res => (
				!res ? alert("Error, cannot join/create the game") : setState("loading")
			))
		}
		socket.on('blackLine', addBackline(socket, setTab))
		socket.on('getGames', setGames)
		socket.on('piecesArray', setPiecesArray)
		socket.on('getMessages', setMessages)
		socket.on('newMessage', setMessages)
		socket.on('newPlayerBoard', setBoards)
		socket.on('playersList', setPlayers)
		socket.on('changeState', setState)
	}, [socket, defaultGameName, defaultName])
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
		setTab={setTab}
		socket={socket}
		setState={setState}
		state={state}
		setPiecesArray={setPiecesArray}
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