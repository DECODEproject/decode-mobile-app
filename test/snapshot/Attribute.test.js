import React from 'react';
import renderer from 'react-test-renderer';
import AttributeComponent from '../../application/components/Attribute/Attribute';

// Avoid warning related to Switch component
// https://github.com/facebook/react-native/issues/16247
jest.mock('Switch', () => 'Switch');

it('renders Attribute on verfied mode component', () => {
  const rendered = renderer.create(<AttributeComponent value="Barcelona" isVerified name="test" />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('renders Attribute on non-verfied mode component', () => {
  const rendered = renderer.create(<AttributeComponent value="Barcelona" isVerified={false} name="test" />).toJSON();
  expect(rendered).toMatchSnapshot();
});
