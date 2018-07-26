import React from 'react';
import { Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Onboarding from 'react-native-onboarding-swiper';
import { goToPinSetup } from '../application/redux/actions/navigation';

const firstPageImage = require('../assets/images/onboarding01.png');
const secondPageImage = require('../assets/images/onboarding02.png');
const thirdPageImage = require('../assets/images/onboarding03.png');

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
  flex: 7,
  fontSize: 36,
  textAlign: 'center',
  color: 'white',
  paddingLeft: 50,
  paddingRight: 50,
};

const titleStyle = {
  flex: 1,
  fontSize: 48,
  color: 'white',
};

const Walkthrough = props => (
  <Onboarding
    onDone={() => props.goToPinSetup()}
    pages={[
      {
        imageContainerStyles: { flex: 7 },
        backgroundColor: '#0575e5',
        image: <Image style={{ width: '95%', height: 400 }} resizeMode="contain" source={firstPageImage} />,
        title: <TitleElement title={'Decode'.toUpperCase()} style={titleStyle} />,
        subtitle: <TitleElement title="Gives you ownership of your personal data" style={subtitleStyle} />,
      },
      {
        backgroundColor: '#fe6e58',
        image: <Image style={{ width: '100%', height: 400 }} resizeMode="contain" source={secondPageImage} />,
        title: 'The Title',
        subtitle: 'This is the subtitle that sumplements the title.',
      },
      {
        backgroundColor: '#999',
        image: <Image style={{ width: '100%', height: 400 }} resizeMode="contain" source={thirdPageImage} />,
        title: 'Triangle',
        subtitle: "Beautiful, isn't it?",
      },
      {
        backgroundColor: '#999',
        image: <Image style={{ width: '100%', height: 400 }} resizeMode="contain" source={thirdPageImage} />,
        title: 'Triangle',
        subtitle: "Beautiful, isn't it?",
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
