/*
 * DECODE App – A mobile app to control your personal data
 * Copyright (C) 2019 – Thoughtworks Ltd.
 * Copyright (C) 2019 – DRIBIA Data Research S.L.
 *
 * DECODE App is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DECODE App is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * email: ula@dribia.com
 */

export default {
  attributesLanding: {
    nodata: 'Get started by adding some data.\nTap the button below to begin.',
    manage: 'Manage Data',
    petitions: 'Browse petitions',
    description: 'This is your personal data stored in the DECODE app',
  },
  attributesSummary: {
    genericName: 'Decidim',
    title: 'requires verified residency.',
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
    failbutton: 'Test timeout',
    failedMessage: 'Your request couldn\'t be processed.\n',
    successMessage: 'Successfully logged in.',
    timeout: 'Timeout exceeded. Please retry',
    refreshMessage: 'Go back to your browser and refresh the page if needed',
  },
  manageAttributes: {
    description: 'You can manage the following personal data. The data will remain within your phone.',
    ageAttribute: 'Date of Birth',
    districtAttribute: 'District',
    districtPlaceholder: 'Select a district',
    genderAttribute: 'Gender',
    genderPlaceholder: 'Select a gender',
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
    cancel: 'Go to the petition website',
    optional: 'Optional data to share:',
    sharing: 'You will be sharing your data with',
    age: 'Age',
    loading: 'This might take a few moments',
    requiredAttributes: 'This data is required to sign the proposal',
    requiredAttributeError: 'You must consent to sharing this data or else you cannot sign this petition. This information is anonymous.',
    manageData: 'Manage your data',
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
    backDecidim: 'Back to the petition',
    voteRecorded: 'Your support has been registered anonymously',
    maybeInterested: 'View Decidim data on Barcelona Now',
    errorText: 'You can go back or view other proposals',
    defaultError: 'There has been an error',
    goBcnNow: 'Go to BarcelonaNow',
    goOther: 'Browse other petitions',
  },
  error: {
    defaultError: 'There has been an error',
    goOther: 'Browse other petitions',
    alreadyIssued: 'Credential already issued for this data.\nUnique credentials can only be issued once',
    notValid: 'Data input is not valid to obtain this credential',
    missingValue: 'Missing data, retry',
    issuedBy: 'Need help? Contact with',
  },
  walkthrough: {
    done: 'Done',
    skip: 'Skip',
    next: 'Next',
    pages: {
      one: {
        title: 'DECODE',
        subtitle: 'your personal data manager',
      },
      two: {
        subtitle: 'Your data has value. It\'s important you have control over it',
      },
      three: {
        subtitle: 'With DECODE, you choose which personal data to share and how it is used',
      },
      four: {
        subtitle: 'Store your personal data with high security standards',
      },
    },
  },
  schema: {
    addressLocality: 'Residency',
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    district: 'District',
  },
  genders: {
    female: 'Female',
    male: 'Male',
    other: 'Other',
  },
  attributesVerification: {
    verify: 'Verify',
    manageData: 'Manage your data',
    emptyData: 'You don\'t have any data to share',
    intro1: 'You are going to ask for a credential from an',
    intro2: 'external service',
    intro3: 'In order to do so, you need to provide the following information:',
    optionalIntro1: 'For the purposes of this pilot, you can share the following data, that will be anonimously aggregated and made',
    optionalIntro2: 'publicly available',
  },
  petitionList: {
    description: 'You can sign with the DECODE app the following petitions:',
    go: 'Go',
    title: 'We reclaim open data in all public administration ',
  }
};
