import React from 'react';
import renderer from 'react-test-renderer';
import Authorisation from './Authorisation';

it('renders Authorisation component', () => {
  const rendered = renderer.create(<Authorisation />).toJSON();
  expect(rendered).toMatchSnapshot();
});
