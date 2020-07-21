import React from 'react';
import {View, ViewStyle} from 'react-native';

import createRestyleComponent from './createRestyleComponent';
import {BaseTheme} from './types';
import {
  backgroundColor,
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
} from './restyleFunctions';

export type BoxProps<Theme extends BaseTheme> = BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  PositionProps<Theme>;

export const boxRestyleFunctions = [
  backgroundColor,
  opacity,
  visible,
  layout,
  spacing,
  border,
  shadow,
  position,
];

const createBox = <
  Theme extends BaseTheme,
  Props = React.ComponentProps<typeof View> & {children?: React.ReactNode}
>(
  BaseComponent: React.ComponentType<any> = View,
) => {
  return createRestyleComponent<
    BoxProps<Theme> & Omit<Props, keyof BoxProps<Theme>>,
    Theme,
    ViewStyle
  >(boxRestyleFunctions, BaseComponent);
};

export default createBox;
