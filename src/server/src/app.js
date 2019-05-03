const Game = require('./classes/game')

let games = []

const getGamesId = id => games.findIndex(game => game.getid() === id)

const launch = socket => {
	socket.on('getGames', _ => socket.emit('getGames', { games: games.map(game => game.getId()) }))
	socket.on('newGame', ({ gameId, playerId }, cb) => {
		if (getGamesId(gameId) !== -1) return cb(false) // cb
		let newGame = new Game(gameId)
		newGame.addPlayer(playerId, socket)
		games.push(newGame)
		return cb(true)
	})
	socket.on('connectToGame', ({ playerId, gameId }, cb) => cb(games[getGameId(gameId)].addPlayer(playerId, socket)))
}

module.exports = launch