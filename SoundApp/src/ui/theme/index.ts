import { extendTheme, ITheme } from 'native-base';

import { COLORS } from './components/Colors';

const theme = extendTheme({
  colors: {
    ...COLORS,
  },
}) as ITheme;

export default theme;
