import Block from './../block'
import React from 'react';
import renderer from 'react-test-renderer';

test('Some test', () => {
	const component = renderer.create(<Block color="#123456" height="50%" width="50%" />)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})