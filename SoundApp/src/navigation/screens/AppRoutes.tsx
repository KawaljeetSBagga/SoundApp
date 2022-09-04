import React from 'react';
import { ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { MainStack } from '../stacks/types';
import { HomeContextProvider } from '../../contexts/HomeContext';
import { HomeScreen } from '../../feature/home/screens/HomeScreen';

const Loading: React.FC = () => (
  <ActivityIndicator
    size="large"
    style={{
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'absolute',
    }}
  />
);

const Stack = createStackNavigator<MainStack>();

const { Navigator, Screen } = Stack;

export const AppRoutes = () => (
  <React.Suspense fallback={<Loading />}>
    <HomeContextProvider>
      <Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName="Home" //App
      >
        <Screen
          name="Home"
          component={HomeScreen} />
      </Navigator>
    </HomeContextProvider>
  </React.Suspense>
);