import React from 'react';
import renderer from 'react-test-renderer';
import VoteButton from '../../../application/components/VoteButton';

it('renders VoteButton enabled', () => {
  const rendered = renderer.create(<VoteButton enabled name={''} />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('renders VoteButton disabled', () => {
  const rendered = renderer.create(<VoteButton enabled={false} name={''} />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it('renders VoteButton with correct name', () => {
  const rendered = renderer.create(<VoteButton enabled name={'A Name'} />).toJSON();
  expect(rendered).toMatchSnapshot();
});
