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
import { View, Platform } from 'react-native';
import Logo from './ScreenLogo/ScreenLogo';

export default {
  navigationBar: {
    backgroundColor: 'white',
    borderBottomWidth: 0,
    borderBottomColor: 'white',
    elevation: 1,
    fontSize: 20,
    fontWeight: '500',
    tintColor: 'rgb(0,163,158)',
    renderTitle: () => <View  style={{marginLeft: Platform.OS === 'ios' ? -20 : -60,}} ><Logo/></View>,
    height: 80,
  },
};
