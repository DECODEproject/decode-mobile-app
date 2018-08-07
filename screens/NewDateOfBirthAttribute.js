import React from 'react';
import { SecureStore } from 'expo';
import { connect } from 'react-redux';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
import Button from '../application/components/Button/Button';
import styles from './styles';
import { saveDateOfBirth } from '../application/redux/actions/attributes';

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
          placeholder="select date"
          format="DD/MM/YYYY"
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            this.setState({ dateOfBirth: date });
          }}
        />
        <Button
          name="addDateOfBirth"
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
};

NewDateOfBirthAttribute.defaultProps = {
  minDate,
  maxDate,
};

const mapStateToProps = state => ({
  walletId: state.wallet.id,
});

const mapDispatchToProps = dispatch => ({
  saveDateOfBirth: (dateOfBirth, walletId) =>
    dispatch(saveDateOfBirth(dateOfBirth, walletId, SecureStore.setItemAsync)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDateOfBirthAttribute);
