import Piece from './../piece'
import React from 'react'
import renderer from 'react-test-renderer'
import {twoDArray} from '../utils'
import pieces from '../../ressources/pieces'

const finish_cb = () => {}

test('Socket hanlder test', () => {
	const component = renderer.create(<Piece nextPiece={pieces[0]} piece={pieces[2]} tab={twoDArray(20, 10, ' ')}/>)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})