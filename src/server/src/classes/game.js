const socketio = require('socket.io')
const Player = require('./player')
const Room = require('./room')

class Game {
	constructor(server) {
		this.io = socketio(server)
		this.rooms = []
		this.no = 0
		this.io.on('connection', this.newConnection.bind(this))
	}

	packRooms() {
		return this.rooms.filter(room => room.getState() === "loading")
			.map(room => ({ id: room.getId(), no: room.getPlayerNo() }))
	}

	newConnection(socket) {
		this.no += 1;
		const player = new Player(socket);
		this.io.emit('no', this.no)
		socket.emit('getRooms', this.packRooms())
		socket.on('hideConnect', (...args) => this.hideConnect(player, socket, ...args))
		socket.on('disconnect', _ => this.disconnect(socket, true))
		socket.on('disconnectFromRoom', _ => this.disconnect(socket))
	}

	sendAvailableRooms() {
		this.io.emit('getRooms', this.packRooms())
	}

	hideConnect(player, socket, { playerId, roomId }, cb) {
		const room = this.rooms[this.getGameId(roomId)]
		if (!room) {
			const newRoom = new Room(roomId, this.sendAvailableRooms.bind(this))
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

	disconnect(socket, real) {
		if (!!real) {
			this.no -= 1
			this.io.emit('no', this.no)
		}
		const index = this.rooms.findIndex(room => room.isIdIn(socket.id))
		if (index === -1) return
		this.rooms[index].disconnect(socket.id)
		if (this.rooms[index].getPlayerNo() === 0)
			this.rooms.splice(index, 1)
		this.io.emit('getRooms', this.packRooms())
	}
}

module.exports = Game