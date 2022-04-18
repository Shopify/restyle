import {ComponentType, ForwardRefExoticComponent} from 'react';
import {StyleProp, Text, TextProps as RNTextProps} from 'react-native';

import createRestyleComponent from './createRestyleComponent';
import {BaseTheme, Optional, RestyleFunctionContainer} from './types';
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

function createText<
  Theme extends BaseTheme,
  Props extends Record<string, any> & {style: StyleProp<RNTextProps>},
  EnableShorthand extends boolean = true,
  OptionalStyleProp extends boolean = true
>(
  BaseComponent: ComponentType<Props>,
): ForwardRefExoticComponent<
  Optional<Props, 'style', OptionalStyleProp> &
    TextProps<Theme, EnableShorthand>
>;

function createText<
  Theme extends BaseTheme,
  Props extends RNTextProps = RNTextProps,
  EnableShorthand extends boolean = true
>(): ForwardRefExoticComponent<Props & TextProps<Theme, EnableShorthand>>;

function createText<
  Theme extends BaseTheme,
  Props extends Record<string, any>,
  EnableShorthand extends boolean = true
>(...args: [] | [ComponentType<Props>]) {
  const BaseComponent = args[0] || Text;
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
}

export default createText;
