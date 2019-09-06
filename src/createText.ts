import {Text} from 'react-native';
import createStyleSystemComponent from './createStyleSystemComponent';
import {BaseTheme} from './types';
import {
  color,
  opacity,
  spacing,
  typography,
  ColorProps,
  OpacityProps,
  SpacingProps,
  visible,
  VisibleProps,
  TypographyProps,
} from './styleFunctions';
import createVariant, {VariantProps} from './createVariant';

export type TextProps<Theme extends BaseTheme> = ColorProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme> &
  TypographyProps<Theme> &
  SpacingProps<Theme> &
  VariantProps<Theme, 'textVariants'>;

export const textStyleFunctions = [
  color,
  opacity,
  visible,
  typography,
  spacing,
  createVariant({themeKey: 'textVariants'}),
];

const createText = <Theme extends BaseTheme>() => {
  return createStyleSystemComponent<TextProps<Theme>>(textStyleFunctions, Text);
};

export default createText;
