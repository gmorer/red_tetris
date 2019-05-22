const Player = require('./player')
const { random_pieces_array } = require('../utils')
/*
	state cycle -> loading => playing
*/

const informPlayers = (players, id, fn) => players.forEach(player => {
	if (player.isId(id)) return;
	fn(player);
})

const getPlayerList = players => players.map(player => ({ name: player.getName(), state: player.getState() }))

class Game {
	/* TO DO : destructor callback to remove the game from the array when everyone disconnected */
	constructor(id) {
		this.players = [];
		this.id = id;
		this.state = "loading";
		this.messages = [];
		this.cb = (type, ...args) => {
			switch (type) {
				case 'state': return this.stateCB(...args)
				case 'blackLine': return this.blackLineCB(...args)
				case 'board': return this.boardCB(...args)
				case 'disconnect': return this.disconnect(...args)
				case 'quit': return this.disconnect(...args)
				case 'newMessage': return this.addMessage(args.msg, name)
			}
		}
	}

	stateCB(id, newState) {
		let all_same = true
		const playersList = getPlayerList(this.players)
		this.players.forEach(player => {
			player.newPlayerList(playersList, this.id)
			if (player.getState() !== newState) all_same = false
		})
		if (all_same && this.players.length > 0) {
			if (this.players[0].getState() === 'ready') {
				/* NEW GAME */
				const piecesSet = random_pieces_array(500);
				this.state = 'playing'
				this.players.forEach(player => {
					player.givePieces(piecesSet);
					player.changeState('playing')
				})
			}
			else if (this.players[0].getState() === 'gameOver') {
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

	boardCB(name, id, board) {
		informPlayers(this.players, id, player => {
			player.newPlayerBoard(name, board)
		})
	}

	disconnect(id) {
		let index = this.players.findIndex(player => player.getId() === id)
		delete this.players[index];
		this.players.splice(index, 1)
		const playersList = getPlayerList(this.players)
		this.players.forEach(player => player.newPlayerList(playersList))
	}

	addPlayer(name, socket) {
		if (this.state === 'playing') return false
		const playersList = getPlayerList(this.players)
		if (playersList.some(player => player.name === name)) return false // one player already with the same name
		playersList.push({ name, state: "loading" })
		const index = this.players.push(new Player(name, socket, this.cb))
		console.log(playersList)
		this.players.forEach(player => player.newPlayerList(playersList, this.id))
		this.players[index - 1].sendMessages(this.messages)
		return true
	}

	addMessage(msg, name) {
		this.messages.push({ name, msg })
		this.players.forEach(player => player.sendMessage(msg, name))
		return true
	}


	getId() { return this.id }
	getState() { return this.state }
	getPlayerNo() { return this.players.length }
	getMessages() { return this.messages }
	isIdIn(id) { return this.players.some(player => player.getId() === id) }
}

module.exports = Game