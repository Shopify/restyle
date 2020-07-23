import React from 'react';
import {Text} from 'react-native';

import createRestyleComponent from './createRestyleComponent';
import {BaseTheme, RestyleFunctionContainer} from './types';
import {
  color,
  opacity,
  spacing,
  typography,
  textShadow,
  visible,
  ColorProps,
  OpacityProps,
  SpacingProps,
  TextShadowProps,
  TypographyProps,
  VisibleProps,
  spacingShorthand,
  SpacingShorthandProps,
} from './restyleFunctions';
import createVariant, {VariantProps} from './createVariant';

type BaseTextProps<Theme extends BaseTheme> = ColorProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme> &
  TypographyProps<Theme> &
  SpacingProps<Theme> &
  TextShadowProps<Theme> &
  VariantProps<Theme, 'textVariants'>;

export type TextProps<
  Theme extends BaseTheme,
  EnableShorthand extends boolean = true
> = EnableShorthand extends true
  ? BaseTextProps<Theme> & SpacingShorthandProps<Theme>
  : BaseTextProps<Theme>;

export const textRestyleFunctions = [
  color,
  opacity,
  visible,
  typography,
  spacing,
  spacingShorthand,
  textShadow,
  createVariant({themeKey: 'textVariants'}),
];

const createText = <
  Theme extends BaseTheme,
  Props = React.ComponentProps<typeof Text> & {children?: React.ReactNode},
  EnableShorthand extends boolean = true
>(
  BaseComponent: React.ComponentType<any> = Text,
) => {
  return createRestyleComponent<
    TextProps<Theme, EnableShorthand> &
      Omit<Props, keyof TextProps<Theme, EnableShorthand>>,
    Theme
  >(
    textRestyleFunctions as RestyleFunctionContainer<
      TextProps<Theme, EnableShorthand>,
      Theme
    >[],
    BaseComponent,
  );
};

export default createText;
