import React from 'react';
import { Box } from 'native-base';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

interface IAnimationProps {
path: any;
}

export const Animation: React.FC<IAnimationProps> = (props) => {

  const { path } = props;

  return (
    <View
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        position: 'absolute',
      }}
    >
      <Box
        top={'50%'}
        width={300}
        height={300}
        alignSelf={'center'}>
        <LottieView
          source={path}
          autoPlay
          loop
        />
      </Box>
    </View>
  );
};
