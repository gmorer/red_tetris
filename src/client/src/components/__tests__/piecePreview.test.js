import Preview from './../piecePreview';
import React from 'react';
import renderer from 'react-test-renderer';

import pieces from './../../ressources/pieces.json'

test('Some test', () => {
	const component = renderer.create(<Preview piece={pieces[2]} />)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})