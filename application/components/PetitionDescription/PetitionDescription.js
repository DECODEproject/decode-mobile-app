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
import { Dimensions, Image, View, ScrollView, Text, Linking } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import HTML from 'react-native-render-html';
import styles from '../../../screens/styles';
import LinkButton from '../LinkButton/LinkButton';
import i18n from '../../../i18n';

const fallbackImage = require('../../../assets/images/icon-barcelona_.png');

class PetitionDescription extends React.Component {
  static htmlToInnerText(html) {
    return html.replace(/<(?:.|\n)*?>/gm, '');
  }

  constructor(props) {
    super(props);
    this.state = {
      showFullDescription: false,
    };
  }

  renderPartialDescriptionText = () => (
    <View style={{ flex: 1, marginLeft: 10 }}>
      <Text style={{ fontWeight: 'bold' }}>{this.props.title}</Text>
      <Text numberOfLines={2} ellipsizeMode="tail">
        {PetitionDescription.htmlToInnerText(this.props.description)}
      </Text>
      <View style={{ alignItems: 'flex-end', paddingTop: 5 }}>
        <LinkButton
          name={this.props.t('more')}
          onPress={() => this.setState({ showFullDescription: true })}
        />
      </View>
    </View>
  );


  renderFullDescriptionText = () => (
    <View style={{ flex: 1, marginLeft: 10 }}>
      <ScrollView>
        <Text style={{ fontWeight: 'bold' }}>{this.props.title}</Text>
        <HTML
          id="description-text"
          style={styles.petitionDescription}
          html={this.props.description}
          imagesMaxWidth={Dimensions.get('window').width}
          onLinkPress={(event, href) => { Linking.openURL(href); }}
        />
      </ScrollView>
      <View style={{ alignItems: 'flex-end', paddingTop: 5 }}>
        <LinkButton
          name={this.props.t('less')}
          onPress={() => this.setState({ showFullDescription: false })}
        />
      </View>
    </View>
  );

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={fallbackImage}
          style={{ width: 64, height: 64 }}
        />
        { this.state.showFullDescription ?
            this.renderFullDescriptionText() :
            this.renderPartialDescriptionText() }
      </View>
    );
  }
}

PetitionDescription.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('attributesSummary', { i18n })(connect()(PetitionDescription));
