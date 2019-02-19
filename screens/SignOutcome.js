import React from 'react';
import { Text, View, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImageOverlay from 'react-native-image-overlay';
import { translate } from 'react-i18next';
import openPetitionInBrowser from '../application/utils';
import styles from './styles';
import Button from '../application/components/Button/Button';
import Logo from '../application/components/ScreenLogo/ScreenLogo';
import Error from './Error';
import i18n from '../i18n';

const successImage = require('../assets/images/city.png');

class SignOutcome extends React.Component {

  successful() {
    return (
      <View style={styles.signOutcomeContainer}>
        <Logo/>
        <ImageOverlay
          source={successImage}
          overlayAlpha={0}
          contentPosition="bottom"
        >
          <Text
            style={{
              fontSize: 34,
              color: 'white',
              marginBottom: 30,
              marginLeft: 20,
              marginRight: 20,
              textAlign: 'center',
              backgroundColor: 'transparent',
            }}
          >
            { this.props.t('voteRecorded')}
          </Text>
        </ImageOverlay>

        <Button
          name={this.props.t('backDecidim')}
          onPress={() => {
            console.log(JSON.stringify(this.props.petition));
            openPetitionInBrowser(this.props.petition.id);
          } }
          style={{
            width: 200,
            alignSelf: 'center',
          }}
        />
        <Button
          name={this.props.t('goBcnNow')}
          onPress={() => Linking.openURL('http://bcnnow.decodeproject.eu')}
          style={{
            width: 200,
            alignSelf: 'center',
          }}
        />
        <Button
          name={this.props.t('goOther')}
          onPress={() => Linking.openURL('http://bcnnow.decodeproject.eu')}
          style={{
            width: 200,
            alignSelf: 'center',
          }}
        />
      </View>
    );
  }

  render() {
    if (!this.props.signSuccess) {
      return <Error title={this.props.petition.title} />;
    }
    return this.successful();
  }
}

SignOutcome.propTypes = {
  signSuccess: PropTypes.bool.isRequired,
  petition: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    closingDate: PropTypes.string,
    id: PropTypes.string,
  }),
  t: PropTypes.func.isRequired,
};

SignOutcome.defaultProps = {
  petition: undefined,
};

const mapStateToProps = state => ({
  signSuccess: state.petition.signed,
  petition: state.petition.petition,
});

const mapDispatchToProps = () => ({ });

export default translate('signOutcome', { i18n })(connect(mapStateToProps, mapDispatchToProps)(SignOutcome));
