import component from './../socketHandler'
import React from 'react';
import renderer from 'react-test-renderer';
import { twoDArray } from '../utils'

const {
	Handler,
	playersReducer,
	addBackline,
	stateReducer,
	boardReducer,
	messagesReducer,
} = component

const socket = {
	on: null,
	emit: () => { }
}

test('Socket hanlder test', () => {
	const component = renderer.create(<Handler socket={socket} />)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})

test('playerReduce test', () => {
	expect(playersReducer([], [{ name: "Joe", state: "loading" }])).toStrictEqual([{ name: "Joe", state: "loading" }])
	expect(playersReducer([{ name: "Joe", state: "loading" }], [{ name: "Joe", state: "playing" }])).toStrictEqual([{ name: "Joe", state: "playing" }])
})

test('addBackline test', () => {
	const setTab = tab => (fn) => { return fn(tab) };
	expect(addBackline(socket, setTab(twoDArray(10, 10, ' ')))(2)).toStrictEqual([
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['#393939', '#393939', '#393939', '#393939', '#393939', '#393939', '#393939', '#393939', '#393939', '#393939'],
		['#393939', '#393939', '#393939', '#393939', '#393939', '#393939', '#393939', '#393939', '#393939', '#393939']
	])
})

test('stateReducer test', () => {
	expect(stateReducer(socket, () => { })(1, "lol")).toBe("lol")
	expect(stateReducer(socket, () => { })(1, "playing")).toBe("playing")
})

test('boardReducer test', () => {
	expect(boardReducer(1, { init: true })).toStrictEqual([])
	expect(boardReducer([{ name: "name" }], { board: [], name: "john" })).toStrictEqual([{ name: "name" }, { name: "john", board: [] }])
	expect(boardReducer([{ name: "john", board: 2 }], { board: 5, name: "john" })).toStrictEqual([{ name: "john", board: 5 }])
})

test('messagesReducer test', () => {
	expect(messagesReducer([4], [2, 3, 4])).toStrictEqual([2, 3, 4])
	expect(messagesReducer([4], 5)).toStrictEqual([4, 5])
})