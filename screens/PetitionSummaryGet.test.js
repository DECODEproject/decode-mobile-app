import React from 'react';
import renderer from 'react-test-renderer';
import PetitionSummaryGet from './PetitionSummaryGet';

it('renders PetitionSummaryGet component', () => {
  const rendered = renderer.create(<PetitionSummaryGet />).toJSON();
  expect(rendered).toMatchSnapshot();
});
