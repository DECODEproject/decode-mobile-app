import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  attributesLandingContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    margin: 16,
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  authorisationBox: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    margin: 16,
    marginTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  authorisationBoxContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between',
  },
  authorisationBoxId: {
    alignSelf: 'center',
    color: 'grey',
    fontSize: 10,
    marginBottom: 16,
  },
  authorisationBoxLogo: {
    alignSelf: 'center',
    color: 'rgb(203,73,45)',
    fontFamily: 'Lato-Bold',
    fontSize: 25,
    marginBottom: 40,
  },
  authorisationBoxTextParagraph: {
    marginBottom: 30,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  authorisationContainer: {
    backgroundColor: 'rgb(246, 246, 246)',
    flex: 1,
    justifyContent: 'space-between',
  },
  cancelSigningPetition: {
    alignSelf: 'center',
    color: '#00F',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
    marginVertical: 20,
  },
  homeContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  homeLogo: {
    height: 275,
    marginTop: 75,
    marginBottom: 50,
    width: 320,
  },
  homePassword: {
    height: Platform.OS === 'ios' ? 35 : 40,
    width: 150,
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  homeTextInput: {
    marginBottom: 20,
    marginRight: 32,
    flexDirection: 'row',
  },
  homeWelcomeMessage: {
    fontSize: 18,
    marginBottom: 30,
  },
  petitionDescription: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  petitionErrorDescription: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  petitionErrorTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
  },
  petitionSummaryBox: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    margin: 16,
    padding: 10,
  },
  petitionSummaryContainer: {
    flex: 1,
    backgroundColor: 'rgb(246, 246, 246)',
  },
  petitionSummaryErrorBox: {
    alignSelf: 'stretch',
    backgroundColor: '#cc0000',
    margin: 16,
    padding: 10,
  },
  petitionSummaryPetitionTitle: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
  },
  QRScannerIntroButtonBox: {
    alignSelf: 'center',
    width: 250,
  },
  QRScannerIntroContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 75,
  },
  QRScannerIntroInstructions: {
    alignSelf: 'center',
    fontSize: 12,
    textAlign: 'center',
    width: 150,
  },
  QRScannerIntroScanner: {
    alignSelf: 'center',
    height: 100,
    marginBottom: 20,
    width: 50,
  },
  signOutcomeBox: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    margin: 16,
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  signOutcomeContainer: {
    alignItems: 'center',
    backgroundColor: 'rgb(246, 246, 246)',
    flex: 1,
  },
  signOutcomeIcon: {
    alignSelf: 'center',
    height: 75,
    marginBottom: 40,
    width: 75,
  },
  signOutcomePetitionTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 15,
    textAlign: 'center',
  },
  signOutcomeText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  signOutcomeTextBox: {
    alignSelf: 'center',
    width: 250,
  },
  signOutcomeTextSubHeading: {
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },
  pinContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  pinLogo: {
    height: 275,
    marginTop: 75,
    marginBottom: 50,
    width: 320,
  },
  pinPassword: {
    height: Platform.OS === 'ios' ? 35 : 40,
    width: 150,
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  pinButton: {
    width: 150,
    alignItems: 'center',
  },
});

export default styles;
