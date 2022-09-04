import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const ErrorToastIcon = (props: SvgProps) => (
  <Svg width={18} height={23} fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 18.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0 2a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-1.414-9L5.293 9.207l1.414-1.414L9 10.086l2.293-2.293 1.414 1.414-2.293 2.293 2.293 2.293-1.414 1.414L9 12.914l-2.293 2.293-1.414-1.414L7.586 11.5Z"
      fill={'rgba(250, 87, 87, 1)'}
    />
  </Svg>
);
