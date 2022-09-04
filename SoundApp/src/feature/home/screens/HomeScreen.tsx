import React from 'react';
import { Box } from 'native-base';
import upperFirst from 'lodash/upperFirst';
import { MotiView, useAnimationState } from 'moti';
import Slider from '@react-native-community/slider';
import { VolumeManager } from 'react-native-volume-manager';
import { Platform, useWindowDimensions } from 'react-native';

import { FileMaster } from '../types/type';
import { Header, Music } from '../components';
import { SText } from '../../../ui/core/text';
import { musicList } from '../constants/data';
import { Animation } from '../components/Animation';
import { VolumeIndicator } from '../../../assets/svg';
import { COLORS } from '../../../ui/theme/components/Colors';
import { useHomeContext } from '../../../contexts/HomeContext';
import { calculatePixel } from '../../../utils/common-functions';
import { requestStoragePermission } from '../service/PermissionManager';
import { PLAY_MUSIC, SOUND_PLAYER } from '../../../utils/constants/Strings';

export const HomeScreen: React.FC = () => {

  const { width } = useWindowDimensions(); // get width of the device

  const { homeState, setSelectedSound, setSoundMasterList } = useHomeContext();

  const animationState = useAnimationState({
    from: {
      opacity: 1,
      translateY: -200,
    },
    to: {
      opacity: 1,
      translateY: 0,
    }
  })

  const musicFileDownloadHanlder = (sound: FileMaster) => {
    const soundList = homeState.soundMasterList.map(obj => [sound].find(o => o.music.type === obj.music.type) || obj);
    setSoundMasterList(soundList);
    if (sound.download.status !== 'in_progress') {
      if (animationState.current == 'from' && sound.music.status !== 'playing') {
        animationState.transitionTo('to')
      } else {
        animationState.transitionTo('from')
      }
      setSelectedSound(sound);
    }
  }

  const setVolume = async (value: number) => {
    await VolumeManager.setVolume(value);
  }

  React.useEffect(() => {
    Platform.OS === 'android' && requestStoragePermission()
  }, [musicList]) // Ask user permission for storage on android platform

  const isSoundPlaying = homeState.soundMasterList.map(item => item.music.status === 'playing' ? true : false);

  return (
    <>
      <Header label={SOUND_PLAYER} bgColor={COLORS.themePussianBlue} />
      <Box
        flex={1}
        alignItems={'center'}
        justifyContent={'center'}
        bg={COLORS.themePussianBlue}>
        <MotiView
          state={animationState}
          transition={{
            type: 'timing',
            duration: 1000
          }}>
          <>
            <SText variant='h2Bold' color={COLORS.white}>
              {homeState.selectedSound.music.status === 'playing'
                && isSoundPlaying.includes(true)
                ? upperFirst((homeState.selectedSound.music.type)?.toString())
                : PLAY_MUSIC}
            </SText>
            {homeState.selectedSound.music.status === 'playing'
              && isSoundPlaying.includes(true) &&
              <Animation path={require('../../../assets/lottie/soundWaves.json')} />}
          </>
        </MotiView>
        {homeState.selectedSound.music.status == 'playing'
          && isSoundPlaying.includes(true)
          && <Box
            bottom={48}
            flexDir={'row'}
            position={'absolute'}
            alignItems={'center'}>
            <Box mr={calculatePixel('width', 10)}><VolumeIndicator /></Box>
            <Slider
              minimumValue={0}
              maximumValue={1}
              onValueChange={setVolume}
              style={{ width: 250, height: 40 }}
              minimumTrackTintColor={COLORS.white}
              maximumTrackTintColor={COLORS.black}
              value={homeState.selectedSoundInstance.getVolume()}
            />
          </Box>}
        <Box
          bottom={20}
          flexDir={'row'}
          position={'absolute'}
          justifyContent={'space-evenly'}
          width={calculatePixel('width', width)}>
          {homeState.soundMasterList.map((item: FileMaster, index) =>
            <Music
              key={index}
              itemFile={item}
              onFileSelected={musicFileDownloadHanlder} />)}
        </Box>
      </Box>
    </>
  );
};