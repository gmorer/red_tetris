import LoadingRoom from './../loadingRoom'
import React from 'react';
import renderer from 'react-test-renderer';

test('Some test', () => {
	const component = renderer.create(<LoadingRoom players={[]} messages={[{name: 'toto', msg: 'test'}]} />)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})