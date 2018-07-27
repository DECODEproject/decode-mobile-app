import React from 'react';
import { Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Onboarding from 'react-native-onboarding-swiper';
import { goToPinSetup } from '../application/redux/actions/navigation';

const firstPageImage = require('../assets/images/onboarding01.png');
const secondPageImage = require('../assets/images/onboarding02.png');
const thirdPageImage = require('../assets/images/onboarding03.png');
const fourthPageImage = require('../assets/images/onboarding04.png');

const TitleElement = ({ title, style }) => (
  <Text style={style}>
    {title}
  </Text>
);

TitleElement.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.shape({}).isRequired,
};

const subtitleStyle = {
  flex: 4,
  fontSize: 32,
  textAlign: 'center',
  color: 'white',
  paddingLeft: 35,
  paddingRight: 35,
};

const titleStyle = {
  flex: 1,
  fontSize: 48,
  color: 'white',
};

const Walkthrough = props => (
  <Onboarding
    onDone={() => props.goToPinSetup()}
    onSkip={() => props.goToPinSetup()}
    bottomBarHighlight={false}
    skipLabel="Skip"
    nextLabel="Next"
    pages={[
      {
        imageContainerStyles: { flex: 7 },
        backgroundColor: '#0575e5',
        image: <Image style={{ width: '95%', height: 400 }} resizeMode="contain" source={firstPageImage} />,
        title: <TitleElement title={'Decode'.toUpperCase()} style={titleStyle} />,
        subtitle: <TitleElement title="Gives you ownership of your personal data" style={subtitleStyle} />,
      },
      {
        imageContainerStyles: { flex: 7 },
        backgroundColor: '#fd56ac',
        image: <Image style={{ width: '95%', height: 400 }} resizeMode="contain" source={secondPageImage} />,
        title: '',
        subtitle: <TitleElement title="Big companies store and sell your data" style={subtitleStyle} />,
      },
      {
        imageContainerStyles: { flex: 7 },
        backgroundColor: '#37bdc2',
        image: <Image style={{ width: '95%', height: 400 }} resizeMode="contain" source={thirdPageImage} />,
        title: <TitleElement title={'Decode'.toUpperCase()} style={titleStyle} />,
        subtitle: <TitleElement title="Gives you back control of your data. It is kept in your wallet" style={subtitleStyle} />,
      },
      {
        imageContainerStyles: { flex: 7 },
        backgroundColor: '#0475e5',
        image: <Image style={{ width: '95%', height: 400 }} resizeMode="contain" source={fourthPageImage} />,
        title: '',
        subtitle: <TitleElement title="Your data is protected" style={subtitleStyle} />,
      },
    ]}
  />
);

Walkthrough.propTypes = {
  goToPinSetup: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  goToPinSetup: () => dispatch(goToPinSetup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Walkthrough);
