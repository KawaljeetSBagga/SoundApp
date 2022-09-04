import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from '../screens/AppRoutes';

export default function AppNavigator() {

  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
