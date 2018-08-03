import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { translate } from 'react-i18next';
import Button from '../application/components/Button/Button';
import { goToNewDateOfBirthAttribute } from '../application/redux/actions/navigation';
import styles from './styles';
import i18n from '../i18n';

const NewAttributes = props => (
  <View style={styles.attributesManagementContainer}>
    <Text>{props.t('description')}</Text>
    <View style={styles.newAttributesAttribute}>
      <Text style={styles.newAttributesAttributeName}>{props.t('ageAttribute')}</Text>
      <Button
        name={props.t('add')}
        onPress={() => props.goToNewDateOfBirthAttribute()}
      />
    </View>
  </View>
);

NewAttributes.propTypes = {
  goToNewDateOfBirthAttribute: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  goToNewDateOfBirthAttribute: () => dispatch(goToNewDateOfBirthAttribute()),
});

export default translate('newAttributes', { i18n })(connect(mapStateToProps, mapDispatchToProps)(NewAttributes));
