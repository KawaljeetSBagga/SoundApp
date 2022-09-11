import React from 'react';
import { Box, Pressable } from 'native-base';
import { MotiView, useAnimationState } from 'moti';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';

import { FileMaster } from '../types/type';
import { COLORS } from '../../../ui/theme/components/Colors';
import { useHomeContext } from '../../../contexts/HomeContext';
import { GuitarWhite, GuitarTransparent } from '../../../assets/svg';
import { downloadFile, playSound } from '../service/DownloadManager';
import { isDataValid, showToast } from '../../../utils/common-functions';

interface IMusicProps {
  itemFile: FileMaster;
  onFileSelected: (sound: FileMaster) => void;
}

export const Music: React.FC<IMusicProps> = (props) => {

  const { itemFile, onFileSelected } = props;

  const { homeState, setSelectedSound } = useHomeContext();

  const animationState = useAnimationState({
    from: {
      opacity: 1,
      translateY: -100,
    },
    to: {
      opacity: 1,
      translateY: 0,
    }
  })

  const startDownload = () => {
    downloadFile(itemFile.music.type, ((file) => {
      onFileSelected(file);
      if (file.download.status === 'downloaded' && file.download.progress === 100) {
        onFileSelected(file);
        levitateSound();
        showToast('success', `File downloaded successfully`);
      }
    }))
  }

  const levitateSound = () => {
    if (animationState.current == 'from') {
      animationState.transitionTo('to')
    } else {
      animationState.transitionTo('from')
    }
  }

  const onSoundPressHandler = () => {
    let status = {} as FileMaster;
    if (itemFile.music.status === 'not_playing') {
      status = {
        music: {
          path: itemFile.music.path,
          type: itemFile.music.type,
          status: 'playing',
        },
        download: {
          progress: 0,
          status: 'downloaded'
        }
      } as FileMaster;
    } else {
      status = {
        music: {
          path: itemFile.music.path,
          type: itemFile.music.type,
          status: 'not_playing',
        },
        download: {
          progress: 0,
          status: 'downloaded'
        }
      } as FileMaster;
    }
    isDataValid(itemFile.music.path) ? ReactNativeBlobUtil.fs.exists(itemFile.music.path)
      .then((exist) => {
        if (!exist) {
          startDownload();
        } else {
          onFileSelected(status);
          setSelectedSound(status);
          levitateSound();
          playSound(itemFile.music.status === 'not_playing', itemFile.music.type, itemFile.music.path, (file) => {
            onFileSelected(file);
            setSelectedSound(file);
            levitateSound();
          });
        }
      }) : startDownload();
  }

  return (
    <Pressable onPress={onSoundPressHandler}>
      <MotiView
        state={animationState}
        transition={{
          type: 'timing',
          duration: 1000
        }}>
        <Box alignItems={'center'}>
          <Box width={32} height={32} />
          <CircularProgressBase
            radius={30}
            activeStrokeWidth={2}
            inActiveStrokeWidth={3}
            inActiveStrokeOpacity={0.3}
            circleBackgroundColor={
              homeState.selectedSound.music.status == 'playing'
                ? COLORS.white : COLORS.transparent}
            inActiveStrokeColor={COLORS.white}
            value={itemFile.download.progress === 100
              ? 100 : itemFile.download.progress}
            activeStrokeColor={COLORS.white}>
            {homeState.selectedSound.music.status == 'playing'
              ? <GuitarTransparent /> : <GuitarWhite />}
          </CircularProgressBase>
        </Box>
      </MotiView>
    </Pressable>
  );
};