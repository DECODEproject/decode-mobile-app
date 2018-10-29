import React from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import i18n from '../../../i18n';
import LinkButton from '../LinkButton/LinkButton';

function DeleteButton(props) {
  return (
    <LinkButton
      name={props.t('title')}
      style={{
        textStyle: {
          color: '#FF0000',
        },
        linkButtonStyle: {
          alignItems: 'flex-end',
          paddingTop: 20,
        },
      }}
      onPress={() => Alert.alert(
        props.t('title'),
        props.t('description'),
        [
          { text: props.t('cancel'), onPress: () => {}, style: 'cancel' },
          { text: props.t('accept'), onPress: () => props.onPress(), style: 'destructive' },
        ],
      )}
    />
  );
}

DeleteButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('deleteButton', { i18n })(DeleteButton);
