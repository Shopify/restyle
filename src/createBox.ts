import {View} from 'react-native';
import createStyleSystemComponent from './createStyleSystemComponent';
import {BaseTheme, Omit} from './types';
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
  PositionProps<Theme>;

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

const createBox = <
  Theme extends BaseTheme,
  Props = React.ComponentProps<typeof View>
>(
  BaseComponent: React.ComponentType<any> = View,
) => {
  return createStyleSystemComponent<
    BoxProps<Theme> & Omit<Props, keyof BoxProps<Theme>>
  >(boxStyleFunctions, BaseComponent);
};

export default createBox;
