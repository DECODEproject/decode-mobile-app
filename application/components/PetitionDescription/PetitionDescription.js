import React from 'react';
import { Dimensions, Image, View, ScrollView, Text, Linking } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import HTML from 'react-native-render-html';
import styles from '../../../screens/styles';
import LinkButton from '../LinkButton/LinkButton';
import i18n from '../../../i18n';

const fallbackImage = require('../../../assets/images/square-city-red.png');

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
      <LinkButton
        name={this.props.t('less')}
        onPress={() => this.setState({ showFullDescription: false })}
      />
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
