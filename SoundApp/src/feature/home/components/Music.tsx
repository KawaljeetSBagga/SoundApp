import React from 'react';
import upperFirst from 'lodash/upperFirst';
import { Box, Pressable } from 'native-base';
import LottieView from 'lottie-react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';

import { FileMaster } from '../types/type';
import { Swag, Piano, Guitar } from '../../../assets/svg';
import { COLORS } from '../../../ui/theme/components/Colors';
import { useHomeContext } from '../../../contexts/HomeContext';
import { downloadFile, playSound } from '../service/DownloadManager';
import { isDataValid, showToast } from '../../../utils/common-functions';

interface IMusicProps {
  itemFile: FileMaster;
  onFileSelected: (sound: FileMaster) => void;
}

export const Music: React.FC<IMusicProps> = (props) => {

  const { itemFile, onFileSelected } = props;

  const { homeState, setSelectedSound } = useHomeContext();

  const isSoundPlaying = homeState.soundMasterList.map(item => item.music.status === 'playing' ? true : false);

  const startDownload = () => {
    downloadFile(itemFile.music.type, ((file) => {
      onFileSelected(file);
      if (file.download.status === 'downloaded' && file.download.progress === 100) {
        onFileSelected(file);
        showToast('success', `${upperFirst(itemFile.music.type as string)} file downloaded successfully`);
      }
    }))
  }

  const onSoundPressHandler = () => {
    isDataValid(itemFile.music.path) ? ReactNativeBlobUtil.fs.exists(itemFile.music.path)
      .then((exist) => {
        if (!exist) {
          startDownload();
        } else {
          const status = {
            music: {
              path: itemFile.music.path,
              type: itemFile.music.type,
              status: 'playing',
            },
            download: {
              progress: 0,
              status: 'not_started'
            }
          } as FileMaster;
          onFileSelected(status);
          setSelectedSound(status);
          playSound(itemFile.music.type, itemFile.music.path, (file) => {
            onFileSelected(file);
            setSelectedSound(file);
          });
        }
      })
      : startDownload();
  }

  return (
    <Box alignItems={'center'}>
      {itemFile.download.status !== 'in_progress'
        && homeState.selectedSound.music.type === itemFile.music.type
        && homeState.selectedSound.music.status == 'playing'
        && isSoundPlaying.includes(true) ?
        <Box width={32} height={32} top={20}>
          <LottieView
            source={require('../../../assets/lottie/music.json')}
            autoPlay
            loop
          />
        </Box> :
        homeState.selectedSound.music.type === itemFile.music.type
          && homeState.selectedSound.music.status == 'playing'
          && isSoundPlaying.includes(true)
          ? <Box width={32} height={32} top={20}>
            <LottieView
              source={require('../../../assets/lottie/music.json')}
              autoPlay
              loop
            />
          </Box> : <Box width={32} height={32} top={20} />}
      <Pressable
        borderRadius={32}
        onPress={onSoundPressHandler}>
        <CircularProgressBase
          radius={30}
          activeStrokeWidth={2}
          inActiveStrokeWidth={3}
          inActiveStrokeOpacity={0.3}
          inActiveStrokeColor={COLORS.white}
          value={itemFile.download.progress === 100 ? 100 : itemFile.download.progress}
          activeStrokeColor={COLORS.progressOrange}>
          {itemFile.music.type === 'swag'
            ? <Swag />
            : itemFile.music.type === 'piano'
              ? <Piano />
              : <Guitar />}
        </CircularProgressBase>
      </Pressable>
    </Box>
  );
};