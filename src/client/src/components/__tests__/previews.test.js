import Previews from './../previews';
import React from 'react';
import renderer from 'react-test-renderer';

test('Some test', () => {
	const component = renderer.create(<Previews previews={[{ name: "toto", board: [[' ', ' ']] }]} />)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})