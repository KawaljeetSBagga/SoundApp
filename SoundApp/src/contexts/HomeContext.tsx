import Sound from 'react-native-sound';
import ReactNativeBlobUtil from 'react-native-blob-util';
import React, { ReactNode, useContext, useReducer } from 'react';

import { FileMaster } from '../feature/home/types/type';
import { musicList } from '../feature/home/constants/data';

interface IHomeState {
  selectedSound: FileMaster,
  selectedSoundInstance: Sound,
  soundMasterList: Array<FileMaster>,
}

let dirs = ReactNativeBlobUtil.fs.dirs;
const filePath = `${dirs.MusicDir}`;

const initialHomeState: IHomeState = {
  selectedSound: {
    music: {
      path: '',
      type: null,
      status: 'not_playing',
    },
    download: {
      progress: 0,
      status: 'not_started'
    }
  },
  selectedSoundInstance: new Sound(`${filePath}/swag.wav`),
  soundMasterList: musicList,
};

const ACTIONS = {
  SET_SELECTED_SOUND: 'SET_SELECTED_SOUND',
  SET_SOUND_MASTER_LIST: 'SET_SOUND_MASTER_LIST',
  SET_SELECTED_SOUND_INSTANCE: 'SET_SELECTED_SOUND_INSTANCE'
};

interface ActionType {
  type: keyof typeof ACTIONS;
  payload: Partial<IHomeState>;
}

const reducer = (state: IHomeState, action: ActionType): IHomeState => {
  switch (action.type) {
    case ACTIONS.SET_SELECTED_SOUND:
      return {
        ...state,
        selectedSound: action.payload.selectedSound,
      } as IHomeState;
    case ACTIONS.SET_SOUND_MASTER_LIST:
      return {
        ...state,
        soundMasterList: action.payload.soundMasterList,
      } as IHomeState;
    case ACTIONS.SET_SELECTED_SOUND_INSTANCE:
      return {
        ...state,
        selectedSoundInstance: action.payload.selectedSoundInstance,
      } as IHomeState;
    default:
      return state;
  }
};

interface HomeContextProps {
  homeState: IHomeState;
  setSelectedSound: (selectedSound: FileMaster) => void;
  setSelectedSoundInstance: (selectedSoundInstance: Sound) => void;
  setSoundMasterList: (soundMasterList: Array<FileMaster>) => void;
}

const HomeContext = React.createContext<HomeContextProps>({
  setSelectedSound: () => { },
  setSoundMasterList: () => { },
  setSelectedSoundInstance: () => { },
  homeState: initialHomeState,
});

const useHomeContext = () => useContext(HomeContext);

const HomeContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialHomeState);

  const value = {
    homeState: state,
    setSelectedSound: (data: FileMaster) => {
      dispatch({
        payload: {
          ...state,
          selectedSound: data,
        },
        type: 'SET_SELECTED_SOUND',
      });
    },
    setSelectedSoundInstance: (data: Sound) => {
      dispatch({
        payload: {
          ...state,
          selectedSoundInstance: data,
        },
        type: 'SET_SELECTED_SOUND_INSTANCE',
      });
    },
    setSoundMasterList: (data: Array<FileMaster>) => {
      dispatch({
        payload: {
          ...state,
          soundMasterList: data,
        },
        type: 'SET_SOUND_MASTER_LIST',
      });
    }
  };

  return (
    <HomeContext.Provider value={value}>
      {children}
    </ HomeContext.Provider>
  );
};

export { HomeContextProvider, useHomeContext };
