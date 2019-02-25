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
import { pickCredentials } from '../../utils/attributeManagement';

const onSelected = (index, value) => {
  console.log(index, value);
};

function CredentialList({t, credentials, bcnnowUrl, sessionId, login}) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 5 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>{t('subHeader')}</Text>
        {
          credentials.length ?
            <RadioGroup onSelect={onSelected} selectedIndex={0} color="rgb(0,163,158)" >
              {
                credentials.map(({predicate}) => (
                  <RadioButton value={predicate} key={predicate}>
                    <Text>{t(predicate)}</Text>
                  </RadioButton>))
              }
            </RadioGroup>
          : <Text style={{ fontSize: 20, color: '#a2a2a2', textAlign: 'center' }}>{t('emptyMessage')}</Text>
        }
      </View>
      {
        credentials.length ?
          <View style={{ flex: 2 }} >
            <Button name={t('button')} onPress={() => login(bcnnowUrl, sessionId, credentials[0])} />
            <Button name={t('failbutton')} onPress={() => login(bcnnowUrl, sessionId, credentials[0], true)} />
          </View>
          : null
      }
    </View>
  );
}

CredentialList.propTypes = {
  t: PropTypes.func.isRequired,
  credentials: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  login: (bcnnowUrl, sessionId, credential, fail) => dispatch(doLogin(loginRequest, bcnnowUrl, sessionId, credential, fail)),
});

const mapStateToProps = state => ({
  credentials: pickCredentials(state.attributes.list),
});

export default translate('login', { i18n })(connect(mapStateToProps, mapDispatchToProps)(CredentialList));
