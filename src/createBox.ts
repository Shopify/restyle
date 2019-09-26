import {View, ViewProps} from 'react-native';
import createStyleSystemComponent from './createStyleSystemComponent';
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
} from './styleFunctions';

export type BoxProps<Theme extends BaseTheme> = BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  PositionProps<Theme> &
  ViewProps;

export const boxStyleFunctions = [
  backgroundColor,
  opacity,
  visible,
  layout,
  spacing,
  border,
  shadow,
  position,
];

const createBox = <Theme extends BaseTheme>() => {
  return createStyleSystemComponent<BoxProps<Theme>>(boxStyleFunctions, View);
};

export default createBox;
