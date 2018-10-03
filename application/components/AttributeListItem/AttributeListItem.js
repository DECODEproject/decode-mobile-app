import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { districtNameFromId } from '../../../lib/districts';
import styles from '../../../screens/styles';
import i18n from '../../../i18n';

const verifiedIcon = require('../../../assets/images/verified.png');

const verifiedRender = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Image
      style={{ marginLeft: 10 }}
      source={verifiedIcon}
      resizeMode="contain"
    />
    <Text style={{ color: '#7ED321', marginLeft: 3 }}>
      Verified
    </Text>
  </View>
);

function renderItemValue(item) {
  if (item.predicate === 'schema:district') {
    return districtNameFromId(item.object);
  }

  return item.object;
}

export function AttributesListItem(props) {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.newAttributesAttributeName}>
          {props.t(props.attribute.item.predicate)}
        </Text>
        {props.attribute.item.provenance.credentials && verifiedRender()}
      </View>
      <Text
        style={[styles.newAttributesAttributeValue, { marginTop: 15 }]}
      >
        {renderItemValue(props.attribute.item)}
      </Text>
    </View>
  );
}


AttributesListItem.propTypes = {
  attribute: PropTypes.shape({
    item: PropTypes.shape({
      predicate: PropTypes.string.isRequired,
      object: PropTypes.string.isRequired,
      provenance: PropTypes.shape({
        credentials: PropTypes.string,
      }),
    }),
  }).isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('schema', { i18n })(AttributesListItem);
