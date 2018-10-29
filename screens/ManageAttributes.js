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
import { saveAttributes } from '../application/redux/actions/attributes';
import { sortedDistrictsList, districtNameFromId, validDistrict } from '../lib/districts';
import { resetNavigation } from '../application/redux/actions/navigation';
import { deleteWalletData } from '../application/redux/actions/wallet';
import styles from './styles';
import i18n from '../i18n';


const maxDate = new Date();
const minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 130);

function DeleteButton(props) {
  return (
    <Button
      name={props.name}
      onPress={() => props.onPress()}
    />
  );
}

DeleteButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

class ManageAttributes extends Component {
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
    if (validDistrict(district)) {
      this.setState({
        district,
      });
    }
  }

  districtsList = () => (
    sortedDistrictsList()
      .map(district => ({ label: district[1], value: district[0] }))
  )

  render() {
    if (this.props.errorSaveAttributes) {
      alert('ERROR');
    }
    return (
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={styles.attributesManagementContainer}>
          {this.props.enabledDeleteButton &&
            <DeleteButton name={this.props.t('delete')} onPress={() => this.props.deleteWalletData(this.props.t)} />}
          <View style={{ flex: 1, maxHeight: 50 }}>
            <Text style={{ fontSize: 20, alignSelf: 'center' }}>{this.props.t('description')}</Text>
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
            <View style={styles.newAttributesAttribute}>
              <Text style={styles.newAttributesAttributeName}>{this.props.t('districtAttribute')}</Text>
              <Picker
                placeholder={{ label: this.props.t('districtPlaceholder'), value: 0 }}
                items={this.districtsList()}
                onValueChange={this.onSetDistrict}
                value={this.state.district}
                style={{ viewContainer: { alignSelf: 'center' } }}
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
                { districtNameFromId(this.state.district) }
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

ManageAttributes.propTypes = {
  t: PropTypes.func.isRequired,
  saveAttributes: PropTypes.func.isRequired,
  walletId: PropTypes.string.isRequired,
  errorSaveAttributes: PropTypes.bool.isRequired,
  currentDateAttr: PropTypes.shape({
    object: PropTypes.string,
  }),
  districtAttr: PropTypes.shape({
    object: PropTypes.string,
  }),
  deleteWalletData: PropTypes.func.isRequired,
  enabledDeleteButton: PropTypes.bool.isRequired,
};

ManageAttributes.defaultProps = {
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
  errorSaveAttributes: state.attributes.errorSaveAttributes,
  enabledDeleteButton: state.featureToggles.enabledDeleteButton,
});

const mapDispatchToProps = dispatch => ({
  saveAttributes: async (dateOfBirth, district, walletId) =>
    dispatch(saveAttributes(dateOfBirth, district, walletId, SecureStore.setItemAsync)),
  deleteWalletData: (t) => {
    const errorDeletingWalletData = () => alert(t('errorDelete')); //eslint-disable-line
    const successDeletingWalletData = () => dispatch(resetNavigation());
    return dispatch(deleteWalletData(
      SecureStore.deleteItemAsync,
      errorDeletingWalletData,
      successDeletingWalletData,
    ));
  },
});

export default translate('manageAttributes', { i18n })(connect(mapStateToProps, mapDispatchToProps)(ManageAttributes));
