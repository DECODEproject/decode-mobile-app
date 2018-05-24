import React from 'react';
import renderer from 'react-test-renderer';
import AttributeComponent from '../../../../application/components/Attribute/Attribute';

it('renders Attribute on verfied mode component', () => {
  const rendered = renderer.create(<AttributeComponent isVerified />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('renders Attribute on non-verfied mode component', () => {
  const rendered = renderer.create(<AttributeComponent isVerified={false} />).toJSON();
  expect(rendered).toMatchSnapshot();
});
