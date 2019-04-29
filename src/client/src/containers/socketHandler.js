// import React from 'react'
import openSocket from 'socket.io-client';

const PORT = 1337

const URL = 'http://localhost'

const Handler = ({ children }) => {
	const socket = openSocket(`${URL}:${PORT}`);
	socket.on('message', console.log)
	socket.emit('message', { a: 'mdr' })
	return children
}

export default Handler