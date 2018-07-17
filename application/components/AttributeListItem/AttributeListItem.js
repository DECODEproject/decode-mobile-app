import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default function AttributesListItem(props) {
  const attributeNames = {
    'schema:birthDate': 'Date of Birth',
    'schema:addressLocality': 'Residency',
  };

  const label = attributeNames[props.attribute.item.predicate];


  return (
    <View>
      <Text>{label} - {props.attribute.item.object} </Text>
    </View>
  );
}


AttributesListItem.propTypes = {
  attribute: PropTypes.shape({
    item: PropTypes.shape({
      predicate: PropTypes.string.isRequired,
      object: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
