import Score from './../score';
import React from 'react';
import renderer from 'react-test-renderer';

test('Some test', () => {
	const component = renderer.create(<Score score="6" />)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})