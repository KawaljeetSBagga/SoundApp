/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
import { NativeBaseProvider } from 'native-base';

import theme from './src/ui/theme';
import { showToast } from './src/utils/common-functions';
import AppNavigator from './src/navigation/app-navigation';
import { toastConfig } from './src/ui/theme/components/toast';
import { useNetworkStatus } from './src/hooks/useNetworkStatus';

export default function App() {
  LogBox.ignoreAllLogs(true);

  const { isConnected } = useNetworkStatus();

  React.useEffect(() => {
    !isConnected && showToast('error', 'Please connect to internet');
  }, [isConnected]);

  return (
    <NativeBaseProvider theme={theme}>
      <AppNavigator />
      <Toast config={toastConfig} />
    </NativeBaseProvider>
  );
}
