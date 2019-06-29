const http = require('http');
const Game = require('./../game')
const Player = require('./../player')

const socket = {
	emit: () => { },
	on: () => { }
}

const player1 = new Player({ ...socket, id: 1 })
const player2 = new Player({ ...socket, id: 2 })

test('lol', () => {
	const game = new Game(http.createServer())
	expect(game.disconnect({ id: 2 }, true)).toBe()
	expect(game.hideConnect(player1, { ...socket, id: 1 }, { playerId: "john", roomId: "lamaison" }, () => { }))
	expect(game.hideConnect(player2, { ...socket, id: 2 }, { playerId: "ivie", roomId: "lamaison" }, () => { }))
	expect(game.sendAvailableRooms()).toBe()
	expect(game.packRooms()).toStrictEqual([{ id: "lamaison", no: 2 }])
	expect(game.newConnection({ ...socket, id: 1 })).toBe()
	expect(game.disconnect({ id: 1 }, true)).toBe()

})