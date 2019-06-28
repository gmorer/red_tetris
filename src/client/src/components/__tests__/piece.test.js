import Piece from './../piece';
import React from 'react';
import renderer from 'react-test-renderer';
import pieces from '../../ressources/pieces'


test('Some test', () => {
	const component = renderer.create(<Piece pos={{ x: 6, y: 7, rotation: 1 }} piece={pieces[0]} isPreview={false} />)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})