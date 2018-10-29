import React from 'react';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { translate } from 'react-i18next';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18n from '../../../i18n';
import { doLogin } from '../../redux/actions/login';
import loginRequest from '../../../lib/LoginClient';
import Button from '../Button/Button';

const onSelected = (index, value) => {
  console.log(index, value);
};

function CredentialList(props) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 5 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>{props.t('subHeader')}</Text>
        <RadioGroup onSelect={onSelected} selectedIndex={0} color="rgb(0,163,158)" >
          {
            props.credentials.map(c => (
              <RadioButton value={c.object} key={c.object}>
                <Text>{c.object}</Text>
              </RadioButton>))
          }
        </RadioGroup>
      </View>
      <View style={{ flex: 1 }} >
        <Button name={props.t('button')} onPress={() => props.login(props.credentials[0])} />
      </View>
    </View>
  );
}

CredentialList.propTypes = {
  t: PropTypes.func.isRequired,
  credentials: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  login: credential => dispatch(doLogin(loginRequest, credential)),
});

const mapStateToProps = state => ({
  credentials: state.login.credentials,
});
export default translate('login', { i18n })(connect(mapStateToProps, mapDispatchToProps)(CredentialList));
