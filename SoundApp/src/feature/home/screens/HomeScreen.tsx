import React from 'react';
import { Box } from 'native-base';
import Draggable from 'react-native-draggable';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { VolumeManager } from 'react-native-volume-manager';
import { Platform, useWindowDimensions } from 'react-native';

import { FileMaster } from '../types/type';
import { Header, Music } from '../components';
import { SText } from '../../../ui/core/text';
import { Animation } from '../components/Animation';
import { COLORS } from '../../../ui/theme/components/Colors';
import { useHomeContext } from '../../../contexts/HomeContext';
import { calculatePixel } from '../../../utils/common-functions';
import { requestStoragePermission } from '../service/PermissionManager';
import { PLAY_MUSIC, SOUND_PLAYER } from '../../../utils/constants/Strings';

export const HomeScreen: React.FC = () => {

  const { width } = useWindowDimensions(); // get width of the device

  let dirs = ReactNativeBlobUtil.fs.dirs;
  const filePath = `${dirs.MusicDir}`;

  let volumeControl = 0;
  const [progress, setProgress] = React.useState(0);
  const { homeState, setSelectedSound } = useHomeContext();

  const musicFileDownloadHanlder = (sound: FileMaster) => {
    setSelectedSound(sound);
    setProgress(sound.download.progress);
  }

  const setVolume = async (isFirstTime: boolean, value: number) => {
    await VolumeManager.setVolume(value, {
      showUI: !isFirstTime && true,
    });
  }

  React.useEffect(() => {
    setVolume(true, 0.5);
    Platform.OS === 'android' && requestStoragePermission()
  }, []) // Ask user permission for storage on android platform

  return (
    <>
      <Header label={SOUND_PLAYER} bgColor={COLORS.themePursianBlue} />
      <Box
        flex={1}
        alignItems={'center'}
        justifyContent={'center'}
        bg={COLORS.themePursianBlue}>
        <>
          <SText variant='h2Bold' color={COLORS.white}>
            {homeState.selectedSound.music.status === 'playing'
              ? 'Star wars'
              : PLAY_MUSIC}
          </SText>
          {homeState.selectedSound.music.status === 'playing' &&
            <Animation path={require('../../../assets/lottie/sound.json')} />}
        </>
        <Box
          bottom={20}
          alignItems={'center'}
          justifyContent={'center'}
          width={calculatePixel('width', width)}>
          <Draggable
            // The below values are static per requirement, later this can be made dynamic over the time
            x={150} // Initial position of the icon (default to center) and volume to 0.5
            y={150}
            minX={0} // setting x betqween range 0 - 370, volume control will move horizontally
            maxX={400}
            minY={150} // setting y as constant because we do not want volume control to move vertically
            maxY={150}
            onDrag={(dragEvent) => {
              if (dragEvent.nativeEvent.pageX <= 45) {
                volumeControl = 0;
              } else if (dragEvent.nativeEvent.pageX > 32
                && dragEvent.nativeEvent.pageX < 320) {
                volumeControl = (dragEvent.nativeEvent.pageX * 0.1) / 32;
              } else {
                volumeControl = 1;
              }
              setVolume(false, volumeControl);
            }}
            children={<Music
              itemFile={{
                music: {
                  path: `${filePath}/guitar.wav`,
                  type: 'guitar',
                  status: homeState.selectedSound.music.status,
                },
                download: {
                  progress: progress,
                  status: homeState.selectedSound.download.status
                }
              }}
              onFileSelected={musicFileDownloadHanlder} />}
          />
        </Box>
      </Box>
    </>
  );
};