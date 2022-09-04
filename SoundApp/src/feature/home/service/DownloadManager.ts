import Sound from 'react-native-sound';
import ReactNativeBlobUtil from 'react-native-blob-util'

import {
  SWAG_FILE_PATH,
  PIANO_FILE_PATH,
  GUITAR_FILE_PATH,
} from '../../../utils/constants/Strings';
import { FileMaster, MusicType } from '../types/type';

let globalSound = new Sound(''); // Assiging local sounds to this global sound variable to shut the previous sound after encountering a new sound play request by user

const getDownloadUrl = (musicType: MusicType) => {
  switch (musicType) {
    case 'swag': return SWAG_FILE_PATH;
    case 'piano': return PIANO_FILE_PATH;
    case 'guitar': return GUITAR_FILE_PATH;
    default: return '';
  }
}

export const playSound = (musicType: MusicType, musicPath: string, setFile: (file: FileMaster) => void) => {
  let sound = new Sound(musicPath, '', (err) => {
    if (err) {
      console.log("Error while playing sound: " + JSON.stringify(err));
      return;
    }
    if (globalSound) {
      globalSound.stop();
    }
    sound.setVolume(0.7);
    globalSound = sound;
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
    .fetch('GET', getDownloadUrl(musicType))
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
      playSound(musicType, musicPath, (file) => {
        setFile(file);
      });
    })
    .catch((errorMessage) => {
      console.log("Error while downloading file::", JSON.stringify(errorMessage));
    })
}