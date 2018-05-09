import { StyleSheet } from 'react-native';

const signButton = {
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

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#FFF',
    borderColor: 'rgba(0, 0, 0, 0.15)',
    borderWidth: 1,
    height: 64,
  },
  signButton: {
    ...signButton,
    backgroundColor: 'rgb(0,163,158)',
  },
  signButtonDisabled: {
    ...signButton,
    backgroundColor: 'rgba(0,163,158,0.4)',
  },
  buttonText: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  disabledButtonText: {
    alignSelf: 'center',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default styles;
