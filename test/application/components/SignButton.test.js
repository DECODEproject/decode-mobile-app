import React from 'react';
import renderer from 'react-test-renderer';
import SignButton from '../../../application/components/SignButton';

it('renders SignButton enabled', () => {
  const rendered = renderer.create(<SignButton enabled />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('renders SignButton disabled', () => {
  const rendered = renderer.create(<SignButton enabled={false} />).toJSON();
  expect(rendered).toMatchSnapshot();
});
