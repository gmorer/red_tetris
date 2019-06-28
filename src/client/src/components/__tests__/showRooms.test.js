import ShowRooms from './../showRooms';
import React from 'react';
import renderer from 'react-test-renderer';

test('Some test', () => {
	const component = renderer.create(<ShowRooms rooms={[{ id: "1", no: 2 }]} name="mdr" />)
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
})