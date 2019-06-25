import GameOver from './../gameOver'
import React from 'react';
import renderer from 'react-test-renderer';

test('Some test', () => {
	const component = renderer.create(<GameOver style={{}} />)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})