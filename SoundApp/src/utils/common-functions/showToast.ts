import Toast from 'react-native-toast-message';

type TOAST_TYPE = 'success' | 'error' | 'info';

export const showToast = (type: TOAST_TYPE, message: string) => {
  Toast.show({
    type: type,
    text1: message,
    position: 'top',
  });
};
