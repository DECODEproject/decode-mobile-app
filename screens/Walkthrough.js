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

import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Onboarding from 'react-native-onboarding-swiper';
import { goToPinSetup } from '../application/redux/actions/navigation';
import TitleElement from '../application/components/TitleElement/TitleElement';
import LinkButton from '../application/components/LinkButton/LinkButton';
import i18n from '../i18n';


const firstPageImage = require('../assets/images/onboarding01.png');
const secondPageImage = require('../assets/images/onboarding02.png');
const thirdPageImage = require('../assets/images/onboarding03.png');
const fourthPageImage = require('../assets/images/onboarding04.png');

const subtitleStyle = {
  flex: 4,
  fontSize: 26,
  textAlign: 'center',
  color: 'white',
  paddingLeft: 35,
  paddingRight: 35,
};

const titleStyle = {
  flex: 1,
  fontSize: 40,
  color: 'white',
};


const Walkthrough = props => (
  <Onboarding
    onSkip={() => props.goToPinSetup()}
    DoneButtonComponent={() => (
      <LinkButton
        onPress={() => props.goToPinSetup()}
        style={{
          linkButtonStyle: {
            marginRight: 10,
          },
          textStyle: {
            color: '#FFF',
          },
        }}
        name={props.t('done')}
      />
        )}
    bottomBarHighlight={false}
    skipLabel={props.t('skip')}
    nextLabel={props.t('next')}
    pages={[
      {
        imageContainerStyles: { flex: 7 },
        backgroundColor: '#0575e5',
        image: <Image style={{ width: '95%', height: 400 }} resizeMode="contain" source={firstPageImage} />,
        title: <TitleElement title={props.t('pages.one.title')} style={titleStyle} />,
        subtitle: <TitleElement title={props.t('pages.one.subtitle')} style={subtitleStyle} />,
      },
      {
        imageContainerStyles: { flex: 7 },
        backgroundColor: '#fd56ac',
        image: <Image style={{ width: '95%', height: 400 }} resizeMode="contain" source={secondPageImage} />,
        title: '',
        subtitle: <TitleElement title={props.t('pages.two.subtitle')} style={subtitleStyle} />,
      },
      {
        imageContainerStyles: { flex: 7 },
        backgroundColor: '#37bdc2',
        image: <Image style={{ width: '95%', height: 400 }} resizeMode="contain" source={thirdPageImage} />,
        title: '',
        subtitle: <TitleElement title={props.t('pages.three.subtitle')} style={subtitleStyle} />,
      },
      {
        imageContainerStyles: { flex: 7 },
        backgroundColor: '#0475e5',
        image: <Image style={{ width: '95%', height: 400 }} resizeMode="contain" source={fourthPageImage} />,
        title: '',
        subtitle: <TitleElement title={props.t('pages.four.subtitle')} style={subtitleStyle} />,
      },
    ]}
  />
);

Walkthrough.propTypes = {
  goToPinSetup: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  goToPinSetup: () => dispatch(goToPinSetup()),
});

export default translate('walkthrough', { i18n })(connect(mapStateToProps, mapDispatchToProps)(Walkthrough));
