import Board from './../mainBoard'
import React from 'react'
import renderer from 'react-test-renderer'

const piecesArray = [2, 3, 4, 5, 6];

test('Socket hanlder test', () => {
	const component = renderer.create(<Board piecesArray={piecesArray} boards={[]}/>)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})