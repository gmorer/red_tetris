const Game = require('./classes/game')
const Player = require('./classes/player')

let games = []

const getGameId = id => games.findIndex(game => game.getId() === id)

const packGames = () => games.filter(game => game.getState() === "loading")
	.map(game => ({ id: game.getId(), no: game.getPlayerNo() }))

const disconnect = (socket, io) => () => {
	const index = games.findIndex(game => game.isIdIn(socket.id))
	if (index === -1) return
	games[index].disconnect(socket.id)
	if (games[index].getPlayerNo() === 0) {
		games.splice(index, 1)
	}
	io.emit('getGames', packGames())
}

const launch = (socket, io) => {
	const player = new Player(socket);
	socket.emit('getGames', packGames())
	socket.on('hideConnect', ({ playerId, gameId }, cb) => {
		const game = games[getGameId(gameId)]
		if (!game) {
			const newGame = new Game(gameId)
			newGame.addPlayer(player, playerId, socket)
			games.push(newGame)
			io.emit('getGames', packGames())
			cb(true)
		} else {
			if (game.addPlayer(player, playerId, socket)) {
				io.emit('getGames', packGames())
				cb(true)
			} else cb(false)
		}
	})
	socket.on('disconnect', disconnect(socket, io))
	socket.on('disconnectFromGame', disconnect(socket, io))
}

module.exports = launch