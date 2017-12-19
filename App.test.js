import React from 'react';
import { expect } from 'chai';
import renderer from 'react-test-renderer';
import App from './App';


it('renders Home component', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).to.not.exist;
});
