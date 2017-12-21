import React from 'react';
import renderer from 'react-test-renderer';
import PetitionSummary from './PetitionSummary';

it('renders Home component', () => {
  const rendered = renderer.create(<PetitionSummary />).toJSON();
  expect(rendered).toMatchSnapshot();
});
