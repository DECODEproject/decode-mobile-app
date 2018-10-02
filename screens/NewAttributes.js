import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { translate } from 'react-i18next';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Picker from 'react-native-picker-select';
import { SecureStore } from 'expo';
import Button from '../application/components/Button/Button';
import LinkButton from '../application/components/LinkButton/LinkButton';
import { saveDateOfBirth, saveDistrict } from '../application/redux/actions/attributes';
import styles from './styles';
import i18n from '../i18n';


const maxDate = new Date();
const minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 130);

class NewAttributes extends Component {
  static route = {
    navigationBar: {
      backgroundColor: 'white',
      fontSize: 20,
      fontWeight: '500',
      tintColor: 'rgb(0,163,158)',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isDatePickerVisible: false,
      currentDate: props.currentDateAttr.object,
      district: props.districtAttr.object,
    };
  }

  onSetDateOfBirth = (date) => {
    this.setState({
      currentDate: moment(date).format('DD/MM/YYYY'),
      isDatePickerVisible: false,
    });
  }

  onSetDistrict = (district) => {
    this.setState({
      district,
    });
  }

  districtsList = () => [
    { label: 'Ciutat Vella', value: '1' },
    { label: 'Eixample', value: '2' },
    { label: 'Gràcia', value: '6' },
    { label: 'Horta-Guinardó', value: '7' },
    { label: 'Les Corts', value: '4' },
    { label: 'Nou Barris', value: '8' },
    { label: 'Sant Andreu', value: '9' },
    { label: 'Sant Martí', value: '10' },
    { label: 'Sants-Montjuïc', value: '3' },
    { label: 'Sarrià-Sant Gervasi', value: '5' },
  ]

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
                style={styles.newAttributesAttributeValue}
              >
                { this.state.currentDate }
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.newAttributesAttribute}>
              <Text style={styles.newAttributesAttributeName}>{this.props.t('districtAttribute')}</Text>
              <Picker
                placeholder={{}}
                hideDoneBar
                items={this.districtsList()}
                onValueChange={this.onSetDistrict}
                value={this.state.district}
              >
                <LinkButton
                  id="district-action-button"
                  name={this.state.district ? this.props.t('edit') : this.props.t('add')}
                  onPress={() => {}}
                  style={{ textStyle: { fontSize: 18 } }}
                />
              </Picker>
            </View>
            <View>
              <Text
                id="district-info"
                style={styles.newAttributesAttributeValue}
              >
                { this.state.district }
              </Text>
            </View>
          </View>
          <DateTimePicker
            minimumDate={minDate}
            maximumDate={maxDate}
            isVisible={this.state.isDatePickerVisible}
            onConfirm={this.onSetDateOfBirth}
            onCancel={() => this.setState({ isDatePickerVisible: false })}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Button
            name={this.props.t('save')}
            onPress={() => this.props.saveAttributes(
              this.state.currentDate,
              this.state.district,
              this.props.walletId,
            )}
          />
        </View>
      </View>
    );
  }
}

NewAttributes.propTypes = {
  t: PropTypes.func.isRequired,
  saveAttributes: PropTypes.func.isRequired,
  walletId: PropTypes.string.isRequired,
  currentDateAttr: PropTypes.shape({
    object: PropTypes.string,
  }),
  districtAttr: PropTypes.shape({
    object: PropTypes.string,
  }),
};

NewAttributes.defaultProps = {
  currentDateAttr: {
    object: '',
  },
  districtAttr: {
    object: '',
  },
};

const mapStateToProps = state => ({
  walletId: state.wallet.id,
  currentDateAttr: state.attributes.list.get('schema:dateOfBirth'),
  districtAttr: state.attributes.list.get('schema:district'),
});

const mapDispatchToProps = dispatch => ({
  saveAttributes: async (dateOfBirth, district, walletId) => {
    await dispatch(saveDateOfBirth(dateOfBirth, walletId, SecureStore.setItemAsync));
    await dispatch(saveDistrict(district, walletId, SecureStore.setItemAsync));
  },
});

export default translate('newAttributes', { i18n })(connect(mapStateToProps, mapDispatchToProps)(NewAttributes));
