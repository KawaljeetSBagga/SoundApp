import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const SuccessToastIcon = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 9A7 7 0 1 1 2 9a7 7 0 0 1 14 0Zm2 0A9 9 0 1 1 0 9a9 9 0 0 1 18 0Zm-9.83 3.895 5.84-5.678-1.395-1.434-4.445 4.322-2.16-2.1L4.615 9.44l3.555 3.456Z"
      fill="#fff"
    />
  </Svg>
);
