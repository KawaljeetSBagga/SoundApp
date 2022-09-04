import React from 'react';
import { Box } from 'native-base';

import { SText } from '../../../ui/core/text';
import { COLORS } from '../../../ui/theme/components/Colors';
import { calculatePixel } from '../../../utils/common-functions';

interface IHeaderProps {
  label: string;
  bgColor: string;
}

export const Header: React.FC<IHeaderProps> = (props) => {

  const { label, bgColor } = props;

  return (
    <Box bg={bgColor} pt={calculatePixel('height', 40)}>
      <Box alignSelf='center'>
        <SText
          variant='h1'
          color={COLORS.white}>
          {label}
        </SText>
      </Box>
    </Box>
  );
};
