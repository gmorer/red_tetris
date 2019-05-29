import React, { useState, useEffect } from 'react'
import openSocket from 'socket.io-client';
import ShowGames from '../components/showGames'
import LoadingRoom from '../components/loadingRoom'
import MainBoard from './mainBoard'

const PORT = 8080
const URL = process.env.NODE_ENV === 'production' ? '/' : `localhost:${PORT}`;
const COLUMNS_NUMBER = 10;
const LIGNE_NUMBER = 20;

const BLACKBLOCK = "#393939"

const twoDArray = (x, y, fill) =>
	Array(x)
		.fill(null)
		.map(() => Array(y).fill(fill));

const tabToPreview = tab => {
	const result = tab.map(y => y.map(x => x))
	result.forEach((line, y) =>
		line.forEach((cube, x) => {
			if (y !== 0 && result[y - 1][x] !== ' ') result[y][x] = "black"
		}))
	return result;
}

const getPage = state => {
	switch (state) {
		case "inactive":
			return ShowGames
		case "ready":
		case "loading": return LoadingRoom
		case "gameOver":
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
	const [tab, setTab] = useState(twoDArray(LIGNE_NUMBER, COLUMNS_NUMBER, ' '))
	let [boards, setBoards] = useState([])
	let [messages, setMessage] = useState([])
	useEffect(() => {
		const blacklinehandler = n => {
			tab.splice(0, n)
			for (let i = 0; i < n; i++)
				tab.push(Array(COLUMNS_NUMBER).fill(BLACKBLOCK))
			setTab(tab.map(a => a))
			socket.emit('boardChange', tabToPreview(tab))
		}
		socket.on('blackLine', blacklinehandler)
		return (() => socket.off('blackline', blacklinehandler))
	}, [tab, socket])
	useEffect(() => {
		if (defaultGameName && defaultName) {
			socket.emit('hideConnect', { gameId: gameName, playerId: name }, res => (
				!res ? alert("Error, cannot join/create the game") : setState("loading")
			))
		}
		socket.on('getGames', setGames)
		socket.on('changeState', setState)
		socket.on('playersList', setPlayers)
		socket.on('piecesArray', setPiecesArray)
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
		setTab={setTab}
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