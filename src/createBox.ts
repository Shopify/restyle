import {View, ViewProps} from 'react-native';
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
  PositionProps<Theme> &
  ViewProps;

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

const createBox = <Theme extends BaseTheme>(
  BaseComponent: React.ComponentType = View,
) => {
  return createRestyleComponent<BoxProps<Theme>>(
    boxRestyleFunctions,
    BaseComponent,
  );
};

export default createBox;
