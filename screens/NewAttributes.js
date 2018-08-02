import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Button from '../application/components/Button/Button';
import { goToNewDateOfBirthAttribute } from '../application/redux/actions/navigation';
import styles from './styles';


const NewAttributes = props => (
  <View style={styles.attributesManagementContainer}>
    <Text>Select an attribute to add to your wallet from the list below.</Text>
    <View style={styles.newAttributesAttribute}>
      <Text style={styles.newAttributesAttributeName}>Date of birth</Text>
      <Button
        name="Add"
        onPress={() => props.goToNewDateOfBirthAttribute()}
      />
    </View>
  </View>
);

NewAttributes.propTypes = {
  goToNewDateOfBirthAttribute: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  goToNewDateOfBirthAttribute: () => dispatch(goToNewDateOfBirthAttribute()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAttributes);
