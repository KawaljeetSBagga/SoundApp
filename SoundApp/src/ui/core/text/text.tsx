import React, { forwardRef } from 'react';
import { Text as BaseText, ITextProps } from 'native-base';

import { TextVariant } from './text.types';
import { TextConfigMap } from './text.config';

export interface TextProps extends ITextProps {
  variant: TextVariant;
  children: React.ReactNode;
}

export const SText: React.FC<TextProps> = forwardRef( // Name - 'SText' refers to SoundApp's customized text
  ({ children, variant, ...props }, ref) => {
    const textColor = props.color || 'black';

    return (
      <BaseText
        ref={ref}
        {...props}
        color={textColor}
        {...TextConfigMap.get(variant)}
      >
        {children}
      </BaseText>
    );
  }
);
