## The App
This app attempts to provide a platform where people can control their personal data, choosing where and how to share it. It allows users to input their data and keep it saved on their phone for future use. Currently, there is also a signing flow for integration with a community engagement platform called Decidim. It allows the user to share their data and vote on a petition securely.

See [Glossary](Glossary.md) for unknown terms.

### Features Description


#### Walkthrough

In order to inform the user about the benefits of using this app, we have included a Walkthrough.

This Walkthrough is a swipe-able multi page component with modifiable images and texts with the ability to skip.

#### Pin Management

In order to secure the app, the authentication system included is PIN based. When you first visit the app and reach the end of the Walkthrough, you will be required to setup a PIN. Subsequently, in order to access the app you must enter your PIN.

There is no way to retrieve the PIN if you forget it. It is saved in the Local Storage of the phone.

#### Data Management

The app includes a Data summary page where you can view all (verified and unverified) data you have in the app. The app distinguishes between verified and unverified data. Currently, from this page you can add more unverified data by clicking the button on the bottom. This redirects you to the data addition page where you can add new data. The data is stored in the local storage of the phone, it is not saved in any external database. You also have to option edit data already saved in the app.

#### Signing Flow

The signing flow was created specifically for the Decidim Pilot. In this flow, you enter the app through an external link from the decidim site **CURRENTLY UNDER CONSTRUCTION**.

### Code Structure

#### The Tech Stack

The app is developed using [React Native](https://facebook.github.io/react-native/) as main language and [Redux](https://redux.js.org/) as the state manager.

The app is being developed using [Docker](https://www.docker.com/) to build and manage environments.

As part of the development tools, we are using [Expo](https://expo.io/) to simulate an IOS and Android environment. Expo allows us to create the different files in order to publish in the different stores. It also provides tools for managing the app navigation, environment variables and the secure storage.

[react-i18next](https://github.com/i18next/react-i18next) library is used to manage localization, currently with English, Spanish and Catalan languages.

Git and github are the version control system.

Jest is used for testing with [Enzyme](https://github.com/airbnb/enzyme) as the React testing framework.

#### Project Structure

The project is separated into 6 main sections


| Folder                    | Description   |
| ------------------------- |:-------------:|
| */application/components* | Custom components |
| */application/redux*      | State management |
| */screens*                | Page components |
| */translations*           | Translation files |
| */lib*                    | Application logic |
| */test/acceptance*        | Attempt at writing a high level test |
| */test/components*        | Component tests |
| */test/snapshot*          | Snapshot tests |
| */test/unit*              | Unit test files for Application logic and Redux actions and reducers |


### Dependencies

To be able to run the app locally, we need to have up and running Chainspace and use the Zenroom contracts.

If you want to know more, check the [Dependencies Documentation](Dependencies.md)

#### Chainspace

Download the Chainspace repo from https://github.com/DECODEproject/chainspace

##### Building with Docker

First, build the container from the Dockerfile
```
docker build -t chainspace .
```

Then run chainspace with the following command
```
docker run -ti -p 5000:5000 --name chainspace chainspace
```

##### Chainspace with Zenroom

If you are going to use contracts that use zenroom you should install it on your computer, here is a small tutorial to install it.

```
git clone git@github.com:DECODEproject/zenroom.git
cd zenroom

## Download the dependencies
git submodule init
git submodule update

## you should have cmake installed
make osx

sudo cp src/zenroom.command /usr/local/bin/zenroom
```

Also, by convention all zenroom contracts are stored into /opt/contracts, at the moment only the elgamal contract is need, so doing the next steps is enough.

```
sudo mkdir /opt/contracts

sudo cp -r examples/elgamal/ /opt/contracts/
```

You can try that everything is working by starting chainspace and execute the zenroom system tests:

```
source .chainspace.env/bin/activate

cd contrib/core-tools/system-test;
python test_zenroom_petition.py
```

### Commands

In order to simplify the necessary commands to setup the app, we use Make.


#### Pre-Requisites

- [Expo](https://expo.io/)
```
npm install -g exp
```

- [Node](https://nodejs.org)

Version 8


##### Install dependencies

In a terminal window run:
```
npm install
```

##### Testing

```
npm test
```
or
```
npm test-watch
```

##### Linting

```
npm run lint
```

##### NOTE: 

All of these commands we also have them so that they can be run inside a Docker container that uses Node 10:

```
make build

make test

make test/watch

make lint
```

#### Launching the Emulator

This is the same for both Node versions

Launch for iOS
```
npm run ios
```

or Android
```
npm run android
```

## Publishing 

### Expo

Since we've built the app with Expo, it can easily be published with the following command:

```
exp publish --release-channel=production
```

The latest version of the app is available [here](https://expo.io/@decode-barcelona/decode-walletapp?release-channel=production).

If you're using an Android phone you can just use the QR code to open the app.

Unfortunately, Expo QR codes don't work on the latest versions for Iphone.

### IOS 

Before publishing, you must update the build number in app.json

In order to generate the files necessary for publishing run the following command

```
exp build:ios
```

Once you have the ipa, follow the normal process for uploading apps to the apple store or test flight. 

### Android

Before publishing, you must update the version code in app.json

In order to generate the files necessary for publishing run the following command

```
exp build:android
```

Once you have the apk, follow the normal process for uploading apps to Google Play.

##### NOTE: 

We have had trouble when publishing to Google Play in the past. The links we use in the app do not work the same way as they had in Expo, with no solution to be found. If the issue doesn't get resolved in Expo, the app might have to be ejected.

## Future Development 

[TO DO]


