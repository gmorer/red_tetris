const { twoDArray, getMapHeigth } = require('../utils')

const BLACK = '#ffffff';
const BOARD_HEIGHT = 20;
const BOARD_WIDTH = 10;

/*
	state cycle: loading => ready => playing => game_over
*/

class Player {
	constructor(name, socket, cb) {
		this.name = name;
		this.socket = socket;
		this.state = "loading";
		this.id = socket.id;
		this.board = twoDArray(BOARD_HEIGHT, BOARD_WIDTH, ' ');
		this.cb = cb
		socket.emit('changeState', 'loading')
		socket.on('changeState', state => {
			this.state = state;
			cb('state', this.id, state);
		})
		socket.on('blackLine', ({ n }) => {
			cb('blackLine', this.id, n)
		})
		socket.on('boardChange', board => {
			this.board = board;
			cb('board', this.name, this.id, board)
		})
	}

	/* Bonus */
	setDifficulty(n) {
		if (n >= 20 || n < 0) return;
		this.board = this.board.slice(n);
		while (n) {
			this.board.push(new Array(BOARD_WIDTH).fill(BLACK))
			n--;
		}
	}

	changeState(state) {
		this.state = state;
		this.socket.emit('changeState', state)
	}

	newPlayerBoard(name, board) {
		this.socket.emit('newPlayerBoard', { name, board })
	}

	getBlackLine(n) {
		let heigth = getMapHeigth(this.board);
		if (heigth + n > BOARD_HEIGHT) {
			this.state = 'game_over'
			this.cb('state', this.id, 'game_over');
			this.socket.emit('state', 'game_over')
		} else {
			this.socket.emit('blackLine', n)
		}
	}

	sendMessage(msg, name) {
		this.socket.emit('newMessage', { msg, name });
	}

	sendMessages(msgs) {
		this.socket.emit('getMessages', msgs);
	}

	newPlayerList(players) { console.log('hey'); this.socket.emit('playersList', players) }
	givePieces(pieces) { this.socket.emit('piecesArray', pieces) }
	isId(id) { return id === this.id }

	/* GETTER */
	getState() { return this.state }
	getName() { return this.name }
	getId() { return this.id }
}

module.exports = Player