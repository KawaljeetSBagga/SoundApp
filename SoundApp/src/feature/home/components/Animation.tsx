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
        top: 20,
        zIndex: 1000,
        position: 'absolute',
      }}
    >
      <Box
        top={'20%'}
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
