const Player = require('../player')

const socket = {
	emit: () => { },
	id: 5,
	on: () => { }
}

test('player class test', () => {
	const player = new Player(socket)
	expect(player.getState()).toBe('waiting');
	expect(player.changeState('loading')).toBe();
	expect(player.getState()).toBe('loading');
	expect(player.newPlayerBoard()).toBe();
	expect(player.getBlackLine()).toBe();
	expect(player.sendMessage()).toBe();
	expect(player.sendMessages()).toBe();
	expect(player.givePieces()).toBe();
	expect(player.isId(4)).toBe(false);
	expect(player.isId(5)).toBe(true);
	expect(player.setName("john")).toBe();
	expect(player.getName()).toBe('john');
	expect(player.getId()).toBe(5);
	expect(player.newPlayerList([{ name: 'john' }, { name: 'arch' }])).toBe();

})