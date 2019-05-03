const Player = require('./player')
const { random_pieces_array } = require('../utils')
/*
	state cycle -> loading => playing
*/

const informPlayers = (players, id, fn) => players.forEach(player => {
	if (player.isId(id)) return;
	fn(player);
})

class Game {
	/* TO DO : destructor callback to remove the game from the array when everyone disconnected */
	constructor(id) {
		this.players = [];
		this.id = id;
		this.state = "loading";
		this.cb = (type, ...args) => {
			switch (type) {
				case 'state': return stateCB(...args)
				case 'blackLine': return blackLineCB(...args)
				case 'board': return boardCB(...args)
				case 'disconnect': return disconnect(...args)
				case 'quit': return disconnect(...args)
			}
		}
	}

	stateCB(id, newState) {
		let all_same = true
		informPlayers(this.players, id, player => {
			player.emit('newState', { id, newState })
			if (player.getState() !== newState) all_same = false
		})
		if (all_same) {
			if (this.players[0].getState() === 'ready') {
				/* NEW GAME */
				const piecesSet = random_pieces_array(500);
				this.state = 'playing'
				this.players.forEach(player => player.changeState('playing', { piecesSet }))
			}
			else if (this.players[0].getState() === 'game_over') {
				/* GAME FINISHED */
				this.state = 'loading';
				this.players.forEach(player => player.changeState('loading'))
			}
		}
	}

	blackLineCB(id, n) {
		informPlayers(this.players, id, player => {
			player.getBlackLine(n);
		})
	}

	boardCB(id, board) {
		informPlayers(this.players, id, player => {
			player.newPlayerBoard(id, board)
		})
	}

	disconnect(id) {
		let index = players.findIndex(player => player.getId() === id)
		delete PushSubscriptionOptions.players[index];
		this.players.splice(index, 1)
		const playersList = this.players.map(player => player.getId())
		this.players.forEach(player => player.newPlayerList(playersList))
	}

	addPlayer(name, socket) {
		if (this.state === 'playing') return false
		const playersList = this.players.map(player => player.getId())
		if (playersList.some(name => id === name)) return false // one player already with the same name
		playersList.push(name)
		this.players.push(new Player(name, socket, this.cb))
		this.players.forEach(player => player.newPlayerList(playersList))
		return true
	}

	getId() { return this.id }
}

module.exports = Game