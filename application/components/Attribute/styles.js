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
  disabledAttributeText: {
    color: '#F00',
  },
});

export default styles;
