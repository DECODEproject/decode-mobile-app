import React from 'react';
import { SecureStore } from 'expo';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
import { translate } from 'react-i18next';
import Button from '../application/components/Button/Button';
import styles from './styles';
import { saveDateOfBirth } from '../application/redux/actions/attributes';
import i18n from '../i18n';

const maxDate = new Date();
const minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 130);

class NewDateOfBirthAttribute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateOfBirth: '',
    };
  }


  render() {
    return (
      <View style={styles.attributesManagementContainer}>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.dateOfBirth}
          mode="date"
          placeholder={this.props.t('datepickerPlaceholder')}
          format="DD/MM/YYYY"
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          confirmBtnText={this.props.t('confirm')}
          cancelBtnText={this.props.t('cancel')}
          customStyles={{
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            this.setState({ dateOfBirth: date });
          }}
        />
        {this.props.errorEmptyDateOfBirth &&
        <Text style={styles.dateOfBirthError}>
          {this.props.t('errorEmptyDateOfBirth')}
        </Text>}
        <Button
          name={this.props.t('save')}
          onPress={() => this.props.saveDateOfBirth(this.state.dateOfBirth, this.props.walletId)}
        />
      </View>
    );
  }
}


NewDateOfBirthAttribute.propTypes = {
  saveDateOfBirth: PropTypes.func.isRequired,
  walletId: PropTypes.string.isRequired,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  errorEmptyDateOfBirth: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

NewDateOfBirthAttribute.defaultProps = {
  minDate,
  maxDate,
};

const mapStateToProps = state => ({
  walletId: state.wallet.id,
  errorEmptyDateOfBirth: state.attributes.errorEmptyDateOfBirth,
});

const mapDispatchToProps = dispatch => ({
  saveDateOfBirth: (dateOfBirth, walletId) =>
    dispatch(saveDateOfBirth(dateOfBirth, walletId, SecureStore.setItemAsync)),
});

export default translate('newDateOfBirthAttribute', { i18n })(connect(mapStateToProps, mapDispatchToProps)(NewDateOfBirthAttribute));
