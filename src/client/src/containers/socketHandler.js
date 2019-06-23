import React, { useState, useEffect, useReducer } from 'react'
import openSocket from 'socket.io-client';
import { toast } from 'react-toastify';
import ShowRooms from '../components/showRooms'
import LoadingRoom from '../components/loadingRoom'
import MainBoard from './mainBoard'
import { tabToPreview, twoDArray } from './utils'

const PORT = 8080
const URL = process.env.NODE_ENV === 'production' ? '/' : `localhost:${PORT}`;
const COLUMNS_NUMBER = 10;
const LIGNE_NUMBER = 20;

const BLACKBLOCK = "#393939"

const getPage = state => {
	switch (state) {
		case "inactive":
			return ShowRooms
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

const stateReducer = (socket, setBoards) => (_, newState) => {
	if (newState === 'playing') {
		setBoards({ init: true })
		socket.emit('boardChange',  tabToPreview(twoDArray(LIGNE_NUMBER, COLUMNS_NUMBER, ' ')))
	}
	socket.emit('changeState', newState)
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

const playersReducer = (name) => (oldPlayers, newPlayers) => {
	if (!oldPlayers || oldPlayers.length !== newPlayers.length) return newPlayers
	const diff = newPlayers.find((player) =>
		(oldPlayers.find(({name}) => name === player.name) || player).state !== player.state
	)
	if (!diff) return newPlayers
	if (diff.state === 'gameOver') {
		const pos = (oldPlayers.length - oldPlayers.filter(({state}) => state === 'gameOver')) || 1;
		toast(`${diff.name === name ? 'You' : name} finished ${pos}th`);
	}
	return newPlayers;
}

const Handler = ({ socket, defaultRoomName, defaultName }) => {
	const [name, setName] = useState(defaultName)
	const [no, setNo] = useState(0)
	const [rooms, setRooms] = useState([])
	const [roomName, setRoomName] = useState(defaultRoomName)
	const [piecesArray, setPiecesArray] = useState(null)
	const [tab, setTab] = useState(twoDArray(LIGNE_NUMBER, COLUMNS_NUMBER, ' '))
	const [boards, setBoards] = useReducer(boardReducer, [])
	const [messages, setMessages] = useReducer(messagesReducer, [])
	const [state, setState] = useReducer(stateReducer(socket, setBoards), "inactive")
	const [players, setPlayers] = useReducer(playersReducer(name), [])

	useEffect(() => {
		if (defaultRoomName && defaultName) {
			socket.emit('hideConnect', { roomId: defaultRoomName, playerId: defaultName }, res => (
				!res ? alert("Error, cannot join/create the game") : setState("loading")
			))
		}
		socket.on('no', setNo)
		socket.on('blackLine', addBackline(socket, setTab))
		socket.on('getRooms', setRooms)
		socket.on('piecesArray', setPiecesArray)
		socket.on('getMessages', setMessages)
		socket.on('newMessage', setMessages)
		socket.on('newPlayerBoard', setBoards)
		socket.on('playersList', setPlayers)
		socket.on('changeState', setState)
	}, [socket, defaultRoomName, defaultName])
	const Page = getPage(state)
	return <Page
		no={no}
		piecesArray={piecesArray}
		roomName={roomName}
		players={players}
		tab={tab}
		rooms={rooms}
		name={name}
		messages={messages}
		setRoomName={setRoomName}
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
	toast.configure({
		autoClose: 8000,
		draggable: false,
	  });
	if (!!regexResult) {
		return <Handler
			socket={socket}
			defaultName={regexResult[1].trim() || null}
			defaultRoomName={regexResult[2].trim() || null}
		/>
	}
	return <Handler socket={socket} />
}

export default Connector