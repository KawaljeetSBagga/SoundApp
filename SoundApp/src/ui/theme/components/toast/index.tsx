// App.jsx
import React from 'react';
import { Box } from 'native-base';
import { Dimensions } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';

import { COLORS } from '../Colors';
import { SText } from '../../../core/text';
import { calculatePixel } from '../../../../utils/common-functions';
import { ErrorToastIcon, SuccessToastIcon } from '../../../../assets/svg';

/*
  Create the toast config
*/

export const toastConfig: ToastConfig = {
  success: ({ text1 }) => (
    <Box
      style={{
        shadowColor: COLORS.toastShadow,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 10,
      }}
      justifyContent={'center'}
      width={Dimensions.get('window').width * 0.94}
      height={calculatePixel('height', 48)}
      borderRadius={12}
      bg={COLORS.mainGreen}
    >
      <Box alignItems={'center'} flexDirection="row" pl={5} pr={5}>
        <SuccessToastIcon />
        <SText ml={'2'} color={COLORS.white} numberOfLines={2} variant="h5">
          {text1}
        </SText>
      </Box>
    </Box>
  ),

  error: ({ text1 }) => (
    <Box
      style={{
        shadowColor: COLORS.toastShadow,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 10,
      }}
      justifyContent={'center'}
      width={Dimensions.get('window').width * 0.94}
      height={calculatePixel('height', 48)}
      borderRadius={12}
      bg={COLORS.white}
    >
      <Box alignItems={'center'} flexDirection="row" pl={5} pr={5}>
        <ErrorToastIcon />
        <SText ml={'2'} color={COLORS.mainRed} numberOfLines={2} variant="h5">
          {text1}
        </SText>
      </Box>
    </Box>
  ),

  info: ({ text1 }) => (
    <Box
      style={{
        shadowColor: COLORS.toastShadow,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 10,
      }}
      justifyContent={'center'}
      width={Dimensions.get('window').width * 0.94}
      height={calculatePixel('height', 48)}
      borderRadius={12}
      bg={COLORS.black}
    >
      <Box alignItems={'center'} flexDirection="row" pl={5} pr={5}>
        <SuccessToastIcon />
        <SText ml={'2'} color={COLORS.white} numberOfLines={2} variant="h5">
          {text1}
        </SText>
      </Box>
    </Box>
  ),
};
