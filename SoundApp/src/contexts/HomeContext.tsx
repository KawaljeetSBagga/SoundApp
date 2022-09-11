import React, { ReactNode, useContext, useReducer } from 'react';

import { FileMaster } from '../feature/home/types/type';

interface IHomeState {
  selectedSound: FileMaster,
}

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
};

const ACTIONS = {
  SET_SELECTED_SOUND: 'SET_SELECTED_SOUND',
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
    default:
      return state;
  }
};

interface HomeContextProps {
  homeState: IHomeState;
  setSelectedSound: (selectedSound: FileMaster) => void;
}

const HomeContext = React.createContext<HomeContextProps>({
  setSelectedSound: () => { },
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
    }
  };

  return (
    <HomeContext.Provider value={value}>
      {children}
    </ HomeContext.Provider>
  );
};

export { HomeContextProvider, useHomeContext };
