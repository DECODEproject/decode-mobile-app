import React, { Component } from 'react';
import { Text, View, Switch } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import Button from '../Button/Button';

export default class Attribute extends Component {
  verifiedMode() {
    const disabledAttributeText = (
      <Text style={styles.disabledAttributeText}>
        You must consent to sharing your status as a Barcelona resident or
        you cannot sign this petition. This information is anonymous.
      </Text>
    );
    return (
      <View style={styles.attributeContainerVerified}>
        <View style={styles.attribute}>
          <Text style={styles.attributeName}>Your residency status (required)</Text>
          <Switch onValueChange={this.props.toggleCallback} value={this.props.isEnabled} />
        </View>
        { !this.props.isEnabled && disabledAttributeText }
      </View>);
  }

  nonVerifiedMode() {
    return (
      <View style={styles.attributeContainerNonVerified}>
        <Text style={styles.attributeName}>Verified Atlantis Resident*</Text>
        <Text style={styles.attributeDetails}>To get this attribute you will be directed
          to the Atlantis Council website
        </Text>
        <Button
          name="REQUEST"
          onPress={this.props.buttonCallback}
          style={{
            width: 100,
          }}
        />
      </View>
    );
  }

  render() {
    if (this.props.isVerified) {
      return this.verifiedMode();
    }
    return this.nonVerifiedMode();
  }
}

Attribute.propTypes = {
  buttonCallback: PropTypes.func,
  isVerified: PropTypes.bool.isRequired,
  toggleCallback: PropTypes.func,
  isEnabled: PropTypes.bool,
};

Attribute.defaultProps = {
  buttonCallback: () => {},
  toggleCallback: () => {},
  isEnabled: true,
};
