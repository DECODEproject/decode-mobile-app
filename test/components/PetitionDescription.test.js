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

  it('should initially show a partial description and a "Mostrar más" button', () => {
    const wrapper = shallow(<PetitionDescription title={title} description={description} />)
      .first().shallow()
      .first()
      .shallow({ context: { store } })
      .dive();

    const partialDescription = wrapper.find(Text).last();
    const { numberOfLines } = partialDescription.props();
    expect(numberOfLines).toBe(2);

    const readMoreButton = wrapper.find(LinkButton).findWhere(b => b.props().name === 'Mostrar más');
    expect(readMoreButton).toHaveLength(1);
  });

  it('should show a full description after clicking "Mostrar más", and a "Mostrar menos" button', () => {
    const wrapper = shallow(<PetitionDescription title={title} description={description} />)
      .first().shallow()
      .first()
      .shallow({ context: { store } })
      .dive();

    const readMoreButton = wrapper.find(LinkButton).findWhere(b => b.props().name === 'Mostrar más');
    readMoreButton.props().onPress();

    wrapper.update();

    const partialDescription = wrapper.find(Text).last();
    const { numberOfLines } = partialDescription.props();
    expect(numberOfLines).toBe(undefined);

    const showLessButton = wrapper.find(LinkButton).findWhere(b => b.props().name === 'Mostrar menos');
    expect(showLessButton).toHaveLength(1);
  });

  it('should show a partial description after clicking "Mostrar menos", and a "Mostrar más" button', () => {
    const wrapper = shallow(<PetitionDescription title={title} description={description} />)
      .first().shallow()
      .first()
      .shallow({ context: { store } })
      .dive();

    const readMoreButton = wrapper.find(LinkButton).findWhere(b => b.props().name === 'Mostrar más');
    readMoreButton.props().onPress();

    wrapper.update();

    const showLessButton = wrapper.find(LinkButton).findWhere(b => b.props().name === 'Mostrar menos');
    showLessButton.props().onPress();

    wrapper.update();

    const partialDescription = wrapper.find(Text).last();
    const { numberOfLines } = partialDescription.props();
    expect(numberOfLines).toBe(2);
  });
});
