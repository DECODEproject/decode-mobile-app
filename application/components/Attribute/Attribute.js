import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const tick = require('../../../assets/images/tick_small.jpg');

export default class Attribute extends Component {
  static verifiedMode() {
    return (
      <View style={styles.attributeContainerVerified}>
        <Image
          style={styles.tick}
          source={tick}
        />
        <View style={styles.attribute}>
          <Text style={styles.attributeName}>Verified Atlantis Resident*</Text>
          <Text style={styles.attributeDetails}>Atlantis Resident Status:
            <Text style={styles.attributeStatus}> Confirmed</Text>
          </Text>
        </View>
      </View>);
  }

  nonVerifiedMode() {
    return (
      <View style={styles.attributeContainerNonVerified}>
        <Text style={styles.attributeName}>Verified Atlantis Resident*</Text>
        <Text style={styles.attributeDetails}>To get this attribute you will be directed
          to the Atlantis Council website
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={this.props.buttonCallback}
        >
          <Text style={styles.buttonText}>REQUEST</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    if (this.props.isVerified) {
      return Attribute.verifiedMode();
    }
    return this.nonVerifiedMode();
  }
}

Attribute.propTypes = {
  buttonCallback: PropTypes.func,
  isVerified: PropTypes.bool.isRequired,
};

Attribute.defaultProps = {
  buttonCallback: () => {},
};
