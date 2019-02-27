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

import { StyleSheet } from 'react-native';

const button = {
  alignSelf: 'stretch',
  borderRadius: 2,
  elevation: 2,
  height: 36,
  marginBottom: 18,
  marginHorizontal: 16,
  marginTop: 10,
  paddingHorizontal: 16,
  paddingVertical: 8,
  shadowColor: 'rgba(0, 0, 0, 0.54)',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
};

const buttonText = {
  alignSelf: 'center',
  fontSize: 16,

  fontWeight: '500',
};

const styles = StyleSheet.create({
  signButton: {
    ...button,
    backgroundColor: 'rgb(0,163,158)',
  },
  signButtonDisabled: {
    ...button,
    backgroundColor: 'rgba(0,163,158,0.4)',
  },
  buttonText: {
    ...buttonText,
    color: '#FFF',
  },
  disabledButtonText: {
    ...buttonText,
    color: 'rgba(255, 255, 255, 0.6)',
  },
});

export default styles;
