import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import styles from '../../../screens/styles';
import i18n from '../../../i18n';

export function AttributesListItem(props) {
  return (
    <View>
      <Text style={styles.newAttributesAttributeName}>
        {props.t(props.attribute.item.predicate)}
      </Text>
      <Text
        style={[styles.newAttributesAttributeValue, { marginTop: 10 }]}
      >
        {props.attribute.item.object}
      </Text>
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
  t: PropTypes.func.isRequired,
};

export default translate('schema', { i18n })(AttributesListItem);
