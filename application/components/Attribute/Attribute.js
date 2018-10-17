import React from 'react';
import { Text, View, Switch } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default function Attribute(props) {
  const disabledAttributeText = (
    <Text style={styles.disabledAttributeText}>
      {props.requiredError}
    </Text>
  );
  return (
    <View style={styles.attributeContainerVerified}>
      <View style={styles.attribute}>
        <Text style={styles.attributeName}>{props.name}</Text>
        { props.isMandatory && <Text style={{ color: '#D0021B' }}> *</Text> }
        <Text style={styles.attributeValue}>{props.value}</Text>
        <Switch onValueChange={props.toggleCallback} value={props.isEnabled} />
      </View>
      { !props.isEnabled && props.isMandatory && disabledAttributeText }
    </View>);
}

Attribute.propTypes = {
  isMandatory: PropTypes.bool,
  toggleCallback: PropTypes.func,
  isEnabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  requiredError: PropTypes.string.isRequired,
};

Attribute.defaultProps = {
  toggleCallback: () => {},
  isMandatory: false,
  isEnabled: true,
};
