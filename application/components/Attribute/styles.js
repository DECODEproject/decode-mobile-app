import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  attributeContainerNonVerified: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    padding: 16,
  },
  attributeContainerVerified: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 20,
  },
  attributeName: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  attributeDetails: {
    color: 'rgba(0, 0, 0, 0.54)',
    marginVertical: 4,
  },
  attribute: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'rgb(0,163,158)',
    borderRadius: 2,
    elevation: 2,
    height: 36,
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: 'rgba(0, 0, 0, 0.54)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: 100,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'rgb(255, 255, 255)',
    fontSize: 14,
    fontWeight: '500',
  },
  disabledAttributeText: {
    color: '#F00',
  },
});

export default styles;
