import createStyleSystemComponent from './createStyleSystemComponent';
import {BaseTheme} from './types';
import {
  backgroundColor,
  opacity,
  layout,
  spacing,
  border,
  position,
  BackgroundColorProps,
  OpacityProps,
  LayoutProps,
  SpacingProps,
  BorderProps,
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
  PositionProps<Theme>;

export const boxStyleFunctions = [
  backgroundColor,
  opacity,
  visible,
  layout,
  spacing,
  border,
  position,
];

const createBox = <Theme extends BaseTheme>() => {
  return createStyleSystemComponent<BoxProps<Theme>>(boxStyleFunctions);
};

export default createBox;
