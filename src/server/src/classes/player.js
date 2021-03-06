const { twoDArray, getMapHeigth } = require('../utils')

const BLACK = '#ffffff';
const BOARD_HEIGHT = 20;
const BOARD_WIDTH = 10;

/*
	state cycle: loading => ready => playing => game_over
*/

const putYou = (name, players) => {
	return players.map(player => {
		if (player.name === name) return { ...player, name: 'You' }
		return player
	})
}

class Player {
	constructor(socket) {
		this.name = null;
		this.socket = socket;
		this.state = 'waiting';
		this.id = socket.id;
		this.board = twoDArray(BOARD_HEIGHT, BOARD_WIDTH, ' ');
		this.cb = null;
		socket.on('changeState', state => {
			if (!this.cb) return
			if (state === 'loading')
				this.board = twoDArray(BOARD_HEIGHT, BOARD_WIDTH, ' ')
			this.state = state;
			this.cb('state', this.name, state, this.state)
		})
		socket.on('blackLine', ({ n }) => {
			if (!this.cb) return
			this.cb('blackLine', this.id, n)
		})
		socket.on('boardChange', board => {
			if (!this.cb) return
			this.board = board;
			this.cb('boardChange', this.name, this.id, board)
		})
		socket.on('newMessage', args => {
			if (!this.cb) return
			this.cb('newMessage', this.name, args)
		})
	}

	changeState(state) {
		this.state = state;
		this.socket.emit('changeState', state)
	}

	newPlayerBoard(name, board) {
		this.socket.emit('newPlayerBoard', { name, board })
	}

	getBlackLine(n) {
		this.socket.emit('blackLine', n)
	}

	sendMessage(msg, name) {
		this.socket.emit('newMessage', { msg, name });
	}

	sendMessages(msgs) {
		this.socket.emit('getMessages', msgs);
	}

	newPlayerList(players) { this.socket.emit('playersList', putYou(this.name, players)) }
	givePieces(pieces) { this.socket.emit('piecesArray', pieces) }
	isId(id) { return id === this.id }

	setName(name) { this.name = name }
	setCb(cb) { this.cb = cb }
	setState(state) { this.state = state }
	/* GETTER */
	getState() { return this.state }
	getName() { return this.name }
	getId() { return this.id }
}

module.exports = Player