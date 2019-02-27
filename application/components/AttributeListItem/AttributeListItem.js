/*
 * DECODE App – A mobile app to control your personal data
 * Copyright (C) 2019 – Thoughtworks Ltd.
 * Copyright (C) 2019 – DRIBIA Data Research S.L.
 *
 * DECODE App is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DECODE App is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * email: ula@dribia.com
 */

import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { districtNameFromId } from '../../../lib/districts';
import { mapGenderIdToName } from '../../../lib/genders';
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
  </View>
);

function renderItemValue(item, t) {
  if (item.predicate === 'schema:district') {
    return districtNameFromId(item.object);
  }

  if (item.predicate === 'schema:gender') {
    return mapGenderIdToName(item.object, t);
  }

  return item.object;
}

export function AttributesListItem(props) {
  return (
    <View style={{ marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.newAttributesAttributeName}>
          {props.t(props.attribute.item.predicate)}
        </Text>
        {props.attribute.item.provenance.credentials && verifiedRender()}
      </View>
      <Text
        style={[styles.newAttributesAttributeValue, { marginTop: 8 }]}
      >
        {renderItemValue(props.attribute.item, props.t)}
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
