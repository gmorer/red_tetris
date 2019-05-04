const Game = require('./classes/game')

let games = []

const getGameId = id => games.findIndex(game => game.getid() === id)

const packGames = () => games.map(game => ({ id: game.getId(), no: game.getPlayerNo() }))

const launch = (socket, io) => {
	socket.emit('getGames', ({ games: packGames() }))
	socket.on('newGame', ({ gameId, playerId }, cb) => {
		if (getGameId(gameId) !== -1) return cb(false) // cb
		const newGame = new Game(gameId)
		newGame.addPlayer(playerId, socket)
		games.push(newGame) - 1
		io.emit('getGames', ({ games: packGames() }))
		return cb(true)
	})
	socket.on('connectToGame', ({ playerId, gameId }, cb) => {
		const game = games[getGameId(gameId)]
		if (game.addPlayer(playerId, socket)) {
			io.emit('getGames', ({ games: packGames() }))
			cb(true)
		}
		cb(false)
	})
	socket.on('disconnect', () => {
		const index = games.findIndex(game => game.isIdIn(socket.id))
		if (index === -1) return
		games[index].disconnect(socket.id)
		if (games[index].getPlayerNo() === 0) {
			games.splice(index, 1)
			io.emit('getGames', ({ games: packGames() }))
		}
	})
}

module.exports = launch