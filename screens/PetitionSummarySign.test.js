import React from 'react';
import renderer from 'react-test-renderer';
import PetitionSummarySign from './PetitionSummarySign';

it('renders PetitionSummarySign component', () => {
  const rendered = renderer.create(<PetitionSummarySign />).toJSON();
  expect(rendered).toMatchSnapshot();
});
