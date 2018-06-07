import { StyleSheet } from 'react-native';

const button = {
  alignSelf: 'stretch',
  borderRadius: 2,
  elevation: 2,
  height: 36,
  marginBottom: 18,
  marginHorizontal: 16,
  marginTop: 10,
  paddingHorizontal: 16,
  paddingVertical: 8,
  shadowColor: 'rgba(0, 0, 0, 0.54)',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
};

const buttonText = {
  alignSelf: 'center',
  fontSize: 16,

  fontWeight: '500',
};

const styles = StyleSheet.create({
  signButton: {
    ...button,
    backgroundColor: 'rgb(0,163,158)',
  },
  signButtonDisabled: {
    ...button,
    backgroundColor: 'rgba(0,163,158,0.4)',
  },
  buttonText: {
    ...buttonText,
    color: '#FFF',
  },
  disabledButtonText: {
    ...buttonText,
    color: 'rgba(255, 255, 255, 0.6)',
  },
});

export default styles;
