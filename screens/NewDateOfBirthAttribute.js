import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Button from '../application/components/Button/Button';
import styles from './styles';
import { saveDateOfBirth } from '../application/redux/actions/attributes';

const NewDateOfBirthAttribute = props => (
  <View style={styles.attributesManagementContainer}>
    <Button name="addDateOfBirth" onPress={() => props.saveDateOfBirth()} />
  </View>
);

NewDateOfBirthAttribute.propTypes = {
  saveDateOfBirth: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  saveDateOfBirth: () => dispatch(saveDateOfBirth('01/01/1990')),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDateOfBirthAttribute);
