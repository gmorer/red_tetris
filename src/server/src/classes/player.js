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
		socket.on('ChangeState', ({ state }) => {
			this.state = state;
			cb('state', this.id, state);
		})
		socket.on('blackLine', ({ n }) => {
			cb('blackLine', this.id, n)
		})
		socket.on('BoardChange', ({ board }) => {
			this.board = board;
			cb('board', this.id, board)
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

	changeState(state, options) {
		this.state = state;
		this.socket.emit('ChangeState', { state, options })
	}

	newPlayerBoard(id, board) {
		this.socket.emit('newPlayerBoard', { id, board })
	}

	getBlackLine(n) {
		let heigth = getMapHeigth(this.board);
		if (heigth + n > BOARD_HEIGHT) {
			this.state = 'game_over'
			this.cb('state', this.id, 'game_over');
			this.socket.emit('state', { state: 'game_over' })
		} else {
			this.socket.emit('blackLine', { n })
		}
	}

	newPlayerList(list) { this.socket.emit('players', { list }) }
	givePices(pieces) { this.socket.emit('pieces', ({ pieces })) }
	isId(id) { return id === this.id }

	/* GETTER */
	getState() { return this.state }
	getName() { return this.name }
	getId() { return this.id }
}

module.exports = Player