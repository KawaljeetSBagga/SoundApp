import { FileMaster } from "../types/type";
import ReactNativeBlobUtil from "react-native-blob-util";

let dirs = ReactNativeBlobUtil.fs.dirs;
const filePath = `${dirs.MusicDir}`;

export const musicList: Array<FileMaster> = [
  {
    music: {
      path: `${filePath}/swag.wav`,
      type: 'swag',
      status: 'not_playing',
    },
    download: {
      progress: 0,
      status: 'not_started'
    }
  },
  {
    music: {
      path: `${filePath}/piano.wav`,
      type: 'piano',
      status: 'not_playing',
    },
    download: {
      progress: 0,
      status: 'not_started'
    }
  },
  {
    music: {
      path: `${filePath}/guitar.wav`,
      type: 'guitar',
      status: 'not_playing',
    },
    download: {
      progress: 0,
      status: 'not_started'
    }
  }
];