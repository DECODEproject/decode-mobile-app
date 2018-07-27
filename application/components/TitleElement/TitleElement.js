import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const TitleElement = ({ title, style }) => (
  <Text style={style}>
    {title}
  </Text>
);

TitleElement.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.shape({}).isRequired,
};

export default TitleElement;
