const Game = require('./classes/game')

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
	socket.emit('getGames', packGames())
	socket.on('newGame', ({ gameId, playerId }, cb) => {
		if (getGameId(gameId) !== -1) return cb(false) // cb
		const newGame = new Game(gameId)
		newGame.addPlayer(playerId, socket)
		games.push(newGame)
		io.emit('getGames', packGames())
		return cb(true)
	})
	socket.on('connectToGame', ({ playerId, gameId }, cb) => {
		const game = games[getGameId(gameId)]
		if (game.addPlayer(playerId, socket)) {
			io.emit('getGames', packGames())
			return cb(true)
		}
		return cb(false)
	})

	socket.on('newMessage', ({ msg, name, gameId }, cb) => {
		console.log("msg: ", msg)
		console.log("name: ", name)
		console.log("gameId: ", gameId)
		const game = games[getGameId(gameId)]
		if (!game) return
		game.addMessage(msg, name)
	})
	socket.on('disconnect', disconnect(socket, io))
	socket.on('disconnectFromGame', disconnect(socket, io))
}

module.exports = launch