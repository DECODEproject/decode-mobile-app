import React from 'react';
import { expect } from 'chai';
import renderer from 'react-test-renderer';
import Home from './Home';

it('renders Home component', () => {
  const rendered = renderer.create(<Home />).toJSON();
  expect(rendered).to.exist;
});
