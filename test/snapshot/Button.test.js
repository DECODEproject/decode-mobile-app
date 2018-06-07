import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../../application/components/Button/Button';

it('renders Button enabled', () => {
  const rendered = renderer.create(<Button enabled name="" />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('renders Button disabled', () => {
  const rendered = renderer.create(<Button enabled={false} name="" />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('renders Button with correct name', () => {
  const rendered = renderer.create(<Button enabled name="A Name" />).toJSON();
  expect(rendered).toMatchSnapshot();
});
