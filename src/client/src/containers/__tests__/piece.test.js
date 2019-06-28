import component from './../piece'
import React from 'react'
import renderer from 'react-test-renderer'
import { twoDArray } from '../utils'
import pieces from '../../ressources/pieces'

const {
	Piece,
	downStop,
	goLeft,
	goRight,
	goDown,
	goSpace,
	rotate
} = component

test('Socket hanlder test', () => {
	const component = renderer.create(<Piece nextPiece={pieces[0]} piece={pieces[2]} tab={twoDArray(20, 10, ' ')} />)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})

const emptyBoard = [
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',]
]

test('downStop test', () => {
	expect(downStop({ rotation: 0, x: 3, y: 6 }, pieces[0], emptyBoard)).toBe(false)
	expect(downStop({ rotation: 0, x: 3, y: 20 }, pieces[0], emptyBoard)).toBe(true)
})

test('goLeft test', () => {
	expect(goLeft({ rotation: 0, x: 3, y: 6 }, pieces[0], emptyBoard)).toStrictEqual({ rotation: 0, x: 2, y: 6 })
	expect(goLeft({ rotation: 0, x: 0, y: 6 }, pieces[0], emptyBoard)).toBe(null)
})

test('goRight test', () => {
	expect(goRight({ rotation: 0, x: 3, y: 6 }, pieces[0], emptyBoard)).toStrictEqual({ rotation: 0, x: 4, y: 6 })
	expect(goRight({ rotation: 0, x: 6, y: 6 }, pieces[0], emptyBoard)).toBe(null)
})

test('goDown test', () => {
	expect({ ...goDown({ rotation: 0, x: 3, y: 6 }, pieces[0], emptyBoard), last_interval: null }).toStrictEqual({ rotation: 0, x: 3, y: 7, last_interval: null })
	expect(goDown({ rotation: 0, x: 6, y: 19 }, pieces[0], emptyBoard)).toBe(null)
})

test('goSpace test', () => {
	expect({ ...goSpace({ rotation: 0, x: 3, y: 6 }, pieces[0], emptyBoard), last_interval: null }).toStrictEqual({ rotation: 0, x: 3, y: 19, last_interval: null, space_trigered: true })
	expect(goSpace({ space_trigered: true }, pieces[0], emptyBoard)).toBe(null)
})

test('rotate test', () => {
	expect(rotate({ rotation: 0, x: 3, y: 6 }, pieces[0], emptyBoard)).toStrictEqual({ rotation: 1, x: 3, y: 6 })
	expect(rotate({ rotation: 0, x: 6, y: 18 }, pieces[0], emptyBoard)).toBe(null)
})
