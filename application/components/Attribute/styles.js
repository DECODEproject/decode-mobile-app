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
    marginBottom: 10,
  },
  attributeName: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 16,
    fontWeight: '500',
  },
  attributeDetails: {
    color: 'rgba(0, 0, 0, 0.54)',
    marginVertical: 4,
  },
  attributeValue: {
    color: '#9B9B9B',
    fontSize: 14,
    marginLeft: 5,
    flex: 1,
  },
  attribute: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabledAttributeText: {
    color: '#F00',
  },
});

export default styles;
