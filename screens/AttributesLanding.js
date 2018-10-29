import React from 'react';
import { Image, Text, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { SecureStore } from 'expo';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import AttributeListItem from '../application/components/AttributeListItem/AttributeListItem';
import Button from '../application/components/Button/Button';
import { goToNewAttributes, resetNavigation } from '../application/redux/actions/navigation';
import { deleteWalletData } from '../application/redux/actions/wallet';
import styles from './styles';
import i18n from '../i18n';

const decodeLogo = require('../assets/images/decode-logo-pin.png');
const emptyStateImage = require('../assets/images/ico-empty-state.png');

function DeleteButton(props) {
  return (
    <Button
      name="Delete"
      onPress={() => props.onPress()}
    />
  );
}

DeleteButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

class AttributesLanding extends React.Component {
  static renderLogo() {
    return (
      <Image
        source={decodeLogo}
        resizeMode="contain"
        style={styles.attributesLandingLogo}
      />);
  }


  attributeExists() {
    return this.props.attributes.size > 0;
  }

  renderListAttributes() {
    return (
      <FlatList
        data={[...this.props.attributes.values()]}
        renderItem={attribute => <AttributeListItem attribute={attribute} />}
        keyExtractor={item => item.predicate}
      />
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
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        {AttributesLanding.renderLogo()}
        <View style={styles.attributesLandingContainer}>
          {centerComponent}
        </View>
        {this.props.enabledDeleteButton &&
          <DeleteButton onPress={() => this.props.deleteWalletData(this.props.t)} />}
        <View style={{ flex: 2 }}>
          <Button
            name={this.props.t('manage')}
            onPress={() => this.props.goToNewAttributes()}
          />
        </View>
      </View>
    );
  }
}

AttributesLanding.propTypes = {
  attributes: PropTypes.instanceOf(Map).isRequired,
  goToNewAttributes: PropTypes.func.isRequired,
  deleteWalletData: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  enabledDeleteButton: PropTypes.bool.isRequired,
};


const mapStateToProps = state => ({
  attributes: state.attributes.list,
  enabledDeleteButton: state.featureToggles.enabledDeleteButton,
});

const mapDispatchToProps = dispatch => ({
  goToNewAttributes: () => dispatch(goToNewAttributes()),
  deleteWalletData: (t) => {
    const errorDeletingWalletData = () => alert(t('errorDelete')); //eslint-disable-line
    const successDeletingWalletData = () => dispatch(resetNavigation());
    return dispatch(deleteWalletData(
      SecureStore.deleteItemAsync,
      errorDeletingWalletData,
      successDeletingWalletData,
    ));
  },
});

export default translate('attributesLanding', { i18n })(connect(mapStateToProps, mapDispatchToProps)(AttributesLanding));
