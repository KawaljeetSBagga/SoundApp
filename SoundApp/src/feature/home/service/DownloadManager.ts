import Sound from 'react-native-sound';
import ReactNativeBlobUtil from 'react-native-blob-util'

import { FileMaster, MusicType } from '../types/type';
import { GUITAR_FILE_PATH } from '../../../utils/constants/Strings';

let globalSound = new Sound(''); // Assiging local sound to this global sound if already playing

export const playSound = (shouldPlaySound: boolean, musicType: MusicType, musicPath: string, setFile: (file: FileMaster) => void) => {
  let sound = new Sound(musicPath, '', (err) => {
    if (err) {
      console.log("Error while playing sound: " + JSON.stringify(err));
      return;
    }
    if (globalSound) {
      globalSound.stop();
    }
    globalSound = sound;
    if (shouldPlaySound) {
      sound.play((onEnd) => {
        onEnd && setFile({
          music: {
            path: musicPath,
            type: musicType,
            status: 'not_playing',
          },
          download: {
            progress: 0,
            status: 'downloaded'
          }
        });
      });
    }
  });
}

export const downloadFile = (musicType: MusicType, setFile: (file: FileMaster) => void) => {
  let dirs = ReactNativeBlobUtil.fs.dirs;
  const filePath = `${dirs.MusicDir}`;

  let musicPath = `${filePath}/${musicType}.wav`;

  ReactNativeBlobUtil.config({
    path: musicPath,
    fileCache: true
  })
    .fetch('GET', GUITAR_FILE_PATH)
    .progress({ interval: 250 }, (received, total) => {
      setFile({
        music: {
          path: musicPath,
          type: musicType,
          status: 'not_playing'
        },
        download: {
          status: 'in_progress',
          progress: Math.ceil((received / total) * 100),
        }
      });
    })
    .then(() => {
      setFile({
        music: {
          path: musicPath,
          type: musicType,
          status: 'playing',
        },
        download: {
          progress: 100,
          status: 'downloaded'
        }
      });
      playSound(true, musicType, musicPath, (file) => {
        setFile(file);
      });
    })
    .catch((errorMessage) => {
      console.log("Error while downloading file::", JSON.stringify(errorMessage));
    })
}