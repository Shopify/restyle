import {Text} from 'react-native';
import createStyleSystemComponent from './createStyleSystemComponent';
import {BaseTheme} from './types';
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
} from './styleFunctions';
import createVariant, {VariantProps} from './createVariant';

export type TextProps<Theme extends BaseTheme> = ColorProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme> &
  TypographyProps<Theme> &
  SpacingProps<Theme> &
  TextShadowProps<Theme> &
  VariantProps<Theme, 'textVariants'>;

export const textStyleFunctions = [
  color,
  opacity,
  visible,
  typography,
  spacing,
  textShadow,
  createVariant({themeKey: 'textVariants'}),
];

const createText = <Theme extends BaseTheme>(
  BaseComponent: React.ComponentType = Text,
) => {
  return createStyleSystemComponent<TextProps<Theme>>(
    textStyleFunctions,
    BaseComponent,
  );
};

export default createText;
