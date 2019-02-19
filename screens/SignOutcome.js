import React from 'react';
import { Text, View, Linking, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImageOverlay from 'react-native-image-overlay';
import { translate } from 'react-i18next';
import openPetitionInBrowser from '../application/utils';
import styles from './styles';
import Button from '../application/components/Button/Button';
import Logo from '../application/components/ScreenLogo/ScreenLogo';
import { goToPetitionList } from '../application/redux/actions/navigation';
import warningIcon from '../assets/images/warning.png';
import successImage from '../assets/images/city.png';
import i18n from '../i18n';

class SignOutcome extends React.Component {
  buildOutcomeText() {
    const petitionError = this.props.petitionError === undefined ? this.props.t('defaultError') : this.props.petitionError;
    const signOutcomeText = `${petitionError} \n\n ${this.props.t('errorText')}`;
    return signOutcomeText;
  }

  buttons() {
    return (
      <React.Fragment>
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
          onPress={() => this.props.goToPetitionList()}
          style={{
            width: 200,
            alignSelf: 'center',
          }}
        />
      </React.Fragment>
    );
  }

  error() {
    return (
      <View style={styles.signOutcomeContainer}>
        <Logo/>
        <View style={styles.signOutcomeBox}>
          <Image
            style={styles.signOutcomeIcon}
            source={warningIcon}
          />
          <View style={styles.signOutcomeTextBox}>
            <Text style={styles.signOutcomeText}>{this.buildOutcomeText()}</Text>
            {this.buttons()}
          </View>
        </View>
      </View>
    );
  }

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
        {this.buttons()}
      </View>
    );
  }

  render() {
    return this.props.signSuccess ? this.successful() : this.error();
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
  goToPetitionList: PropTypes.func.isRequired,
};

SignOutcome.defaultProps = {
  petition: undefined,
};

const mapStateToProps = state => ({
  signSuccess: state.petition.signed,
  petition: state.petition.petition,
});

const mapDispatchToProps = dispatch => ({
  goToPetitionList: () => dispatch(goToPetitionList()),
});

export default translate('signOutcome', { i18n })(connect(mapStateToProps, mapDispatchToProps)(SignOutcome));
