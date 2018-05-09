import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

function VoteButton(props) {
  const styleButton = props.enabled ? styles.buttonText : styles.disabledButtonText;
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        disabled={!props.enabled}
        style={props.enabled ? styles.signButton : styles.signButtonDisabled}
        onPress={props.onPress}
      >
        <Text style={styleButton}>{props.name}</Text>
      </TouchableOpacity>
    </View>);
}

VoteButton.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onPress: PropTypes.func,
  name: PropTypes.string.isRequired,
};

VoteButton.defaultProps = {
  onPress: () => {
  },
};

export default VoteButton;

