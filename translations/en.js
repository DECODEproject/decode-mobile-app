export default {
  attributesLanding: {
    nodata: 'Get started by adding some data.\nTap the button below to begin.',
    manage: 'Manage Data',
  },
  attributesSummary: {
    title: 'Signing this proposal requires verified residency.',
    subtitle: 'You can do this with the Barcelona City Council. Your residency will be verified anonymously. You only need to do this once.',
    requirement: 'Requires the following:',
    more: 'Show more',
    less: 'Show less',
    button: 'Verify',
    cancel: 'Or cancel signing this proposal',
    requiredAttributes: 'This data is required to sign the proposal',
  },
  deleteButton: {
    title: 'Delete all data',
    description: 'All your data and PIN will be deleted from the app',
    cancel: 'Cancel',
    accept: 'Accept',
  },
  home: {
    badPin: 'Incorrect PIN code',
    button: 'Sign In',
    errorTitle: 'Failed to fetch proposal information from Decidim',
    errorText: 'You can return to the Decidim site to view other active proposals.',
  },
  login: {
    emptyMessage: 'You don\'t have any data that can be used to log in.',
    header: 'BCNNow requires a credential to log you in',
    subHeader: 'You can log in by sharing your:',
    button: 'Login',
  },
  manageAttributes: {
    description: 'You can add the following personal data',
    ageAttribute: 'Date of Birth',
    districtAttribute: 'District',
    districtPlaceholder: 'Select a district',
    add: 'Add',
    edit: 'Edit',
    save: 'Save',
    errorDelete: 'Error deleting data',
  },
  newDateOfBirthAttribute: {
    datepickerPlaceholder: 'Select a date',
    confirm: 'Confirm',
    cancel: 'Cancel',
    errorEmptyDateOfBirth: 'You must select a date',
    errorSaveDateOfBirth: 'Could not save the date',
    save: 'Save',
  },
  petitionSummary: {
    yes: 'Sign Yes',
    no: 'Sign No',
    cancel: 'Or cancel signing this proposal',
    optional: 'Optional data to share:',
    sharing: 'You will be sharing your data with',
    age: 'Age',
    loading: 'This might take a few moments',
    requiredAttributes: 'This data is required to sign the proposal',
    requiredAttributeError: 'You must consent to sharing your status as a Barcelona resident or you cannot sign this petition. This information is anonymous.',
  },
  pinSetup: {
    placeholderPin1: ' At least 4 digits',
    placeholderPin2: 'Confirm PIN',
    errorPin1: 'PIN must be at least 4 digits long',
    errorPin2: 'PIN must be same as above',
    labelPin1: 'Enter PIN:',
    labelPin2: 'Confirm PIN:',
    button: 'Save',
    title: 'Protect Your Data',
    subtitle: 'Let\'s setup a PIN, so no one else can access your data',
    pinWarning: 'Store your PIN safely, there is no way to recover it if you lose it!',
  },
  signOutcome: {
    backDecidim: 'Back to Decidim',
    voteRecorded: 'Your vote has been recorded anonymously',
    maybeInterested: 'View Decidim data on Barcelona Now',
    errorText: 'You can return to the Decidim site to view other proposals.',
    defaultError: 'There has been an error',
  },
  walkthrough: {
    done: 'Done',
    skip: 'Skip',
    next: 'Next',
    pages: {
      one: {
        title: 'DECODE',
        subtitle: 'is your safe and easy personal data manager',
      },
      two: {
        subtitle: 'Your data has value. It\'s important you have control over it',
      },
      three: {
        subtitle: 'With DECODE, you choose which personal data to share and how it is used',
      },
      four: {
        subtitle: 'Store your personal data with the highest security standards',
      },
    },
  },
  schema: {
    addressLocality: 'Residency',
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    district: 'District',
  },
};
