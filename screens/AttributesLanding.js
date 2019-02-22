import React from 'react';
import { Image, Text, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import AttributeListItem from '../application/components/AttributeListItem/AttributeListItem';
import Button from '../application/components/Button/Button';
import ScreenLogo from '../application/components/ScreenLogo/ScreenLogo';
import { goToNewAttributes, goToPetitionList } from '../application/redux/actions/navigation';
import styles from './styles';
import i18n from '../i18n';

const emptyStateImage = require('../assets/images/ico-empty-state.png');

class AttributesLanding extends React.Component {

  attributeExists() {
    return this.props.attributes.size > 0;
  }

  renderListAttributes() {
    const alphabeticalComparator = (a, b) => (a.predicate > b.predicate ? 1 : -1);

    return (
      <View>
        <View>
          <Text style={{ fontSize: 16, marginBottom: 16 }}>{this.props.t('description')}</Text>
        </View>
        <FlatList
          data={[...this.props.attributes.values()].sort(alphabeticalComparator)}
          renderItem={attribute => <AttributeListItem attribute={attribute} />}
          keyExtractor={item => item.predicate}
        />
      </View>
    );
  }

  renderEmpty() {
    return (
      <View>
        <Image
          source={emptyStateImage}
          resizeMode="contain"
          style={styles.attributesLandingImage}
        />
        <Text style={styles.attributesLandingText}>
          {this.props.t('nodata')}
        </Text>
      </View>
    );
  }

  render() {
    const centerComponent = this.attributeExists()
      ? this.renderListAttributes()
      : this.renderEmpty();

    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ScreenLogo />
        <View style={styles.attributesLandingContainer}>
          {centerComponent}
        </View>
        <View style={{ flex: 3, paddingVertical: 40}}>
          <Button
            name={this.props.t('manage')}
            onPress={() => this.props.goToNewAttributes()}
          />
          <Button
            name={this.props.t('petitions')}
            onPress={() => this.props.goToPetitionList()}
          />
        </View>
      </View>
    );
  }
}

AttributesLanding.propTypes = {
  attributes: PropTypes.instanceOf(Map).isRequired,
  goToNewAttributes: PropTypes.func.isRequired,
  goToPetitionList: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  attributes: state.attributes.list,
});

const mapDispatchToProps = dispatch => ({
  goToNewAttributes: () => dispatch(goToNewAttributes()),
  goToPetitionList: () => dispatch(goToPetitionList()),
});

export default translate('attributesLanding', { i18n })(connect(mapStateToProps, mapDispatchToProps)(AttributesLanding));
