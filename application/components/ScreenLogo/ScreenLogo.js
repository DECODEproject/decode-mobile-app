import React from 'react';
import {View, Image} from 'react-native';
import decodeLogo from '../../../assets/images/header-logo.png';

const ScreenLogo = () =>
  <View style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}>
    <Image
      source={decodeLogo}
    />
  </View>
;

export default ScreenLogo;
