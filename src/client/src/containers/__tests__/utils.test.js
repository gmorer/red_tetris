import {
	IsItBlock,
	tabToPreview,
	twoDArray
} from '../utils'
import pieces from '../../ressources/pieces'

test('IsItBlock test', () => {
	expect(IsItBlock(pieces[0], {rotation: 0, y: 0, x: 0}, twoDArray(20, 10, ' '))).toBe(false)
	expect(IsItBlock(pieces[0], {rotation: 0, y: 0, x: 0}, twoDArray(20, 10, 'x'))).toBe(true)
})

test('tabToPreview test', () => {
	expect(tabToPreview([
		['x', ' ', ' ', ' '],
		[' ', 'x', ' ', ' '],
		[' ', ' ', ' ', ' '],
		[' ', 'x', ' ', ' '],
		[' ', 'x', 'x', ' ']
	])).toStrictEqual([
		['x', ' ', ' ', ' '],
		['black', 'x', ' ', ' '],
		['black', 'black', ' ', ' '],
		['black', 'black', ' ', ' '],
		['black', 'black', 'x', ' ']
	])
})

test('twoDArray test', () => {
	expect(twoDArray(5, 5, ' ')).toStrictEqual([
		[' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ']
	])
})