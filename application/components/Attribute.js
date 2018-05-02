import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  attributeContainerNonVerified: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    padding: 16,
  },
  attributeContainerVerified: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 1,
    padding: 16,
  },
  attributeName: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 16,
    fontWeight: '500',
  },
  attributeDetails: {
    color: 'rgba(0, 0, 0, 0.54)',
    marginVertical: 4,
  },
  attribute: {
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'rgb(0,163,158)',
    borderRadius: 2,
    elevation: 2,
    height: 36,
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: 'rgba(0, 0, 0, 0.54)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: 100,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'rgb(255, 255, 255)',
    fontSize: 14,
    fontWeight: '500',
  },
  tick: {
    height: 20,
    marginTop: 3,
    width: 20,
  },
  attributeStatus: {
    fontWeight: '500',
  },
});

const tick = require('../../assets/images/tick_small.jpg');

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
