// import lel from './../mainBoard'
import component from './../mainBoard'
import React from 'react'
import renderer from 'react-test-renderer'

const piecesArray = [2, 3, 4, 5, 6];

const { Board, deleteEmptyRow, getNextPiece } = component

test('mainboard test', () => {
	const component = renderer.create(<Board piecesArray={piecesArray} boards={[]} />)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})

test('deletEmptyRow test', () => {
	expect(deleteEmptyRow([
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', 'x', 'x', 'x', 'x', 'x', ' ', ' ', ' ', ' '],
		['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
		['x', 'x', 'x', 'x', 'x', ' ', 'x', 'x', 'x', 'x'],
		['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']
	])).toBe(2);
})

test('getNextPiece test', () => {
	expect(getNextPiece(new Array(7), 4)).toBe(5)
	expect(getNextPiece(new Array(7), 6)).toBe(0)
})