import NameChooser from './../nameChooser';
import React from 'react';
import renderer from 'react-test-renderer';

test('Some test', () => {
	const component = renderer.create(<NameChooser />)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})