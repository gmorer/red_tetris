const socketio = require('socket.io')
const Player = require('./player')
const Room = require('./room')

/*
	Piece is like room, and Game is like the whole game, with only one instance
*/

class Game {
	constructor(server) {
		this.io = socketio(server)
		this.rooms = []
		this.io.on('connection', this.newConnection.bind(this))
	}

	packRooms() {
		return this.rooms.filter(room => room.getState() === "loading")
			.map(room => ({ id: room.getId(), no: room.getPlayerNo() }))
	}

	newConnection(socket) {
		const player = new Player(socket);
		socket.emit('getRooms', this.packRooms())
		socket.on('hideConnect', (...args) => this.hideConnect(player, socket, ...args))
		socket.on('disconnect', _ => this.disconnect(socket))
		socket.on('disconnectFromRoom', _ => this.disconnect(socket))
	}

	hideConnect(player, socket, { playerId, roomId }, cb) {
		const room = this.rooms[this.getGameId(roomId)]
		if (!room) {
			const newRoom = new Room(roomId)
			newRoom.addPlayer(player, playerId, socket)
			this.rooms.push(newRoom)
			this.io.emit('getRooms', this.packRooms())
			cb(true)
		} else {
			if (room.addPlayer(player, playerId, socket)) {
				this.io.emit('getRooms', this.packRooms())
				cb(true)
			} else cb(false)
		}
	}

	getGameId(id) {
		return this.rooms.findIndex(room => room.getId() === id)
	}

	disconnect(socket) {
		const index = this.rooms.findIndex(room => room.isIdIn(socket.id))
		if (index === -1) return
		this.rooms[index].disconnect(socket.id)
		if (this.rooms[index].getPlayerNo() === 0) {
			this.rooms.splice(index, 1)
		}
		this.io.emit('getRooms', this.packRooms())
	}
}

module.exports = Game