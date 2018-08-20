import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { translate } from 'react-i18next';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { SecureStore } from 'expo';
import Button from '../application/components/Button/Button';
import LinkButton from '../application/components/LinkButton/LinkButton';
import { saveDateOfBirth } from '../application/redux/actions/attributes';
import styles from './styles';
import i18n from '../i18n';


class NewAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDatePickerVisible: false,
      currentDate: props.currentDateAttr.object,
    };
  }

  onSetDateOfBirth = (date) => {
    this.setState({
      currentDate: moment(date).format('DD/MM/YYYY'),
      isDatePickerVisible: false,
    });
  }

  render() {
    return (
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={styles.attributesManagementContainer}>
          <View style={{ flex: 1, maxHeight: 50 }}>
            <Text>{this.props.t('description')}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.newAttributesAttribute}>
              <Text style={styles.newAttributesAttributeName}>{this.props.t('ageAttribute')}</Text>
              <LinkButton
                id="age-action-button"
                name={this.state.currentDate ? this.props.t('edit') : this.props.t('add')}
                onPress={() => this.setState({ isDatePickerVisible: true })}
                style={{ textStyle: { fontSize: 18 } }}
              />
            </View>
            <View>
              <Text
                id="age-info"
                style={{ fontSize: 18, color: '#4A4A4A', display: this.state.currentDate ? 'flex' : 'none' }}
              >
                { this.state.currentDate }
              </Text>
            </View>
          </View>
          <DateTimePicker
            isVisible={this.state.isDatePickerVisible}
            onConfirm={this.onSetDateOfBirth}
            onCancel={() => this.setState({ isDatePickerVisible: false })}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Button
            name={this.props.t('save')}
            onPress={() => this.props.saveDateOfBirth(this.state.currentDate, this.props.walletId)}
          />
        </View>
      </View>
    );
  }
}

NewAttributes.propTypes = {
  t: PropTypes.func.isRequired,
  saveDateOfBirth: PropTypes.func.isRequired,
  walletId: PropTypes.string.isRequired,
  currentDateAttr: PropTypes.shape({
    object: PropTypes.string,
  }),
};

NewAttributes.defaultProps = {
  currentDateAttr: {
    object: '',
  },
};

const mapStateToProps = state => ({
  walletId: state.wallet.id,
  currentDateAttr: state.attributes.list.get('schema:dateOfBirth'),
});

const mapDispatchToProps = dispatch => ({
  saveDateOfBirth: (dateOfBirth, walletId) =>
    dispatch(saveDateOfBirth(dateOfBirth, walletId, SecureStore.setItemAsync)),
});

export default translate('newAttributes', { i18n })(connect(mapStateToProps, mapDispatchToProps)(NewAttributes));
