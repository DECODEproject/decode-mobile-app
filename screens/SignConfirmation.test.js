import React from 'react';
import renderer from 'react-test-renderer';
import SignConfirmation from './SignConfirmation';

it('renders SignConfirmation component', () => {
  const rendered = renderer.create(<SignConfirmation />).toJSON();
  expect(rendered).toMatchSnapshot();
});
