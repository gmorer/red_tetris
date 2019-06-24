import Handler from './../socketHandler'
import React from 'react';
import renderer from 'react-test-renderer';

const socket = {
	on: null
}

test('Socket hanlder test', () => {
	const component = renderer.create(<Handler socket={socket} />)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})