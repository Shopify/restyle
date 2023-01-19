import React from 'react';
import {View} from 'react-native';

import createRestyleComponent from './createRestyleComponent';
import {BaseTheme, RestyleFunctionContainer} from './types';
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

type BaseBoxProps<Theme extends BaseTheme> = BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  PositionProps<Theme>;

export type BoxProps<
  Theme extends BaseTheme,
  EnableShorthand extends boolean = true,
> = BaseBoxProps<Theme> & EnableShorthand extends true
  ? BaseBoxProps<Theme> &
      SpacingShorthandProps<Theme> &
      BackgroundColorShorthandProps<Theme>
  : BaseBoxProps<Theme>;

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
  EnableShorthand extends boolean = true,
>(
  BaseComponent: React.ComponentType<any> = View,
) => {
  return createRestyleComponent<
    BoxProps<Theme, EnableShorthand> &
      Omit<Props, keyof BoxProps<Theme, EnableShorthand>>,
    Theme
  >(
    boxRestyleFunctions as RestyleFunctionContainer<
      BoxProps<Theme, EnableShorthand>,
      Theme
    >[],
    BaseComponent,
  );
};

export default createBox;
