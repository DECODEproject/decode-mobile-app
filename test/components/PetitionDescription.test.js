import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Text } from 'react-native';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16/build/index';
import PetitionDescription from '../../application/components/PetitionDescription/PetitionDescription';
import LinkButton from '../../application/components/LinkButton/LinkButton';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureStore([thunk]);

describe('PetitionDescription', () => {
  const title = 'title';
  const description = 'a'.repeat(150);
  const store = mockStore({});

  it('should initially show a partial description and a "Ver mas" button', () => {
    const wrapper = shallow(<PetitionDescription title={title} description={description} />)
      .first().shallow()
      .first()
      .shallow({ context: { store } })
      .dive();

    const partialDescription = wrapper.find(Text).last();
    const { numberOfLines } = partialDescription.props();
    expect(numberOfLines).toBe(2);

    const readMoreButton = wrapper.find(LinkButton).findWhere(b => b.props().name === 'Ver mas');
    expect(readMoreButton).toHaveLength(1);
  });

  it('should show a full description after clicking "Ver mas", and a "Ver menos" button', () => {
    const wrapper = shallow(<PetitionDescription title={title} description={description} />)
      .first().shallow()
      .first()
      .shallow({ context: { store } })
      .dive();

    const readMoreButton = wrapper.find(LinkButton).findWhere(b => b.props().name === 'Ver mas');
    readMoreButton.props().onPress();

    wrapper.update();

    const partialDescription = wrapper.find(Text).last();
    const { numberOfLines } = partialDescription.props();
    expect(numberOfLines).toBe(undefined);

    const showLessButton = wrapper.find(LinkButton).findWhere(b => b.props().name === 'Ver menos');
    expect(showLessButton).toHaveLength(1);
  });

  it('should show a partial description after clicking "Ver menos", and a "Ver mas" button', () => {
    const wrapper = shallow(<PetitionDescription title={title} description={description} />)
      .first().shallow()
      .first()
      .shallow({ context: { store } })
      .dive();

    const readMoreButton = wrapper.find(LinkButton).findWhere(b => b.props().name === 'Ver mas');
    readMoreButton.props().onPress();

    wrapper.update();

    const showLessButton = wrapper.find(LinkButton).findWhere(b => b.props().name === 'Ver menos');
    showLessButton.props().onPress();

    wrapper.update();

    const partialDescription = wrapper.find(Text).last();
    const { numberOfLines } = partialDescription.props();
    expect(numberOfLines).toBe(2);
  });
});
