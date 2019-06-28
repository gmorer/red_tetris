import {
	IsItBlock,
	tabToPreview,
	twoDArray,
	getDownPos,
	getUpPos
} from '../utils'
import pieces from '../../ressources/pieces'

test('IsItBlock test', () => {
	expect(IsItBlock(pieces[0], { rotation: 0, y: 0, x: 0 }, twoDArray(20, 10, ' '))).toBe(false)
	expect(IsItBlock(pieces[0], { rotation: 0, y: 0, x: 0 }, twoDArray(20, 10, 'x'))).toBe(true)
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

const emptyTab = [
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
]

const nonEmptyTab = [
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', 'x', 'x', 'x', 'x', 'x', 'x', ' ',],
]

test('getDownPos', () => {
	expect(getDownPos({ x: 3, y: 0, rotation: 0 }, pieces[0], emptyTab)).toStrictEqual({ x: 3, y: 0, rotation: 0 })
})

test('getUpsPos', () => {
	expect(getUpPos({ x: 3, y: 0, rotation: 0 }, pieces[0], nonEmptyTab)).toStrictEqual({ x: 3, y: 8, rotation: 0 })
})