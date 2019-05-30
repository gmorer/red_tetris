const pieces = require('./ressources/pieces.json')

const twoDArray = (x, y, fill) =>
	Array(x)
		.fill(null)
		.map(() => Array(y).fill(fill));

const getMapHeigth = map => map.findIndex(line => {
	line.some(n => n !== ' ')
})

const random_pieces_array = x =>
	Array(x)
		.fill(null)
		// .map(_ => 1)
		.map(_ => Math.floor(Math.random() * pieces.length));

module.exports = {
	twoDArray,
	getMapHeigth,
	random_pieces_array
}