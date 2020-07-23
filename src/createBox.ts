import React from 'react';
import {View} from 'react-native';

import createRestyleComponent from './createRestyleComponent';
import {BaseTheme} from './types';
import {
  backgroundColor,
  backgroundColorShorthand,
  opacity,
  layout,
  spacing,
  border,
  shadow,
  position,
  BackgroundColorProps,
  OpacityProps,
  LayoutProps,
  SpacingProps,
  BorderProps,
  ShadowProps,
  PositionProps,
  visible,
  VisibleProps,
  SpacingShorthandProps,
  BackgroundColorShorthandProps,
  spacingShorthand,
} from './restyleFunctions';

export type BoxProps<
  Theme extends BaseTheme,
  EnableShorthand extends boolean = true
> = BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  PositionProps<Theme> &
  (EnableShorthand extends true
    ? SpacingShorthandProps<Theme> & BackgroundColorShorthandProps<Theme>
    : Record<string, never>);

export const boxRestyleFunctions = [
  backgroundColor,
  backgroundColorShorthand,
  opacity,
  visible,
  layout,
  spacing,
  spacingShorthand,
  border,
  shadow,
  position,
];

const createBox = <
  Theme extends BaseTheme,
  Props = React.ComponentProps<typeof View> & {children?: React.ReactNode},
  EnableShorthand extends boolean = true
>(
  BaseComponent: React.ComponentType<any> = View,
) => {
  return createRestyleComponent<
    BoxProps<Theme, EnableShorthand> &
      Omit<Props, keyof BoxProps<Theme, EnableShorthand>>,
    Theme
  >(boxRestyleFunctions, BaseComponent);
};

export default createBox;
