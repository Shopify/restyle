import React, {useMemo} from 'react';
import {
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';

import createRestyleComponent from '../createRestyleComponent';
import {BaseTheme, RestyleFunctionContainer} from '../types';
import createVariant, {VariantProps} from '../createVariant';

type BaseTextInputProps<Theme extends BaseTheme> = VariantProps<
  Theme,
  'textInputVariants'
>;

export type TextInputProps<Theme extends BaseTheme> = BaseTextInputProps<Theme>;

interface ExtraTextInputProps {
  /**
   * Whether the text input is disabled
   * @example
   * <TextInput disabled={true} />
   */
  disabled?: boolean;
  /**
   * The component to render before the text input
   * @example
   * <TextInput LeadingComponent={<Icon name="user" />} />
   */
  LeadingComponent?: React.ReactNode;
  /**
   * The component to render after the text input
   * @example
   * <TextInput TrailingComponent={<Icon name="user" />} />
   */
  TrailingComponent?: React.ReactNode;
}

const removeVerticalPaddingProps = (style: ViewStyle) => {
  const {padding, paddingVertical, ...rest} = style;
  return rest;
};

const keepBorderProps = (style: ViewStyle) => {
  const {borderWidth, borderColor} = style;
  return {borderWidth, borderColor};
};

const innerProps = (style: ViewStyle & TextStyle) => {
  const {padding, paddingVertical, fontSize, fontWeight} = style;
  return {padding, paddingVertical, fontSize, fontWeight};
};

export const textInputRestyleFunctions = [
  createVariant({themeKey: 'textInputVariants'}),
];

const createTextInput = <
  Theme extends BaseTheme,
  Props = RNTextInputProps & ExtraTextInputProps,
>(
  BaseComponent: React.ComponentType<any> = TextInput,
) => {
  return createRestyleComponent<
    TextInputProps<Theme> & Omit<Props, keyof TextInputProps<Theme>>,
    Theme
  >(
    textInputRestyleFunctions as RestyleFunctionContainer<
      TextInputProps<Theme>,
      Theme
    >[],
    ({
      style,
      disabled,
      fullWidth,
      accessible = true,
      accessibilityRole = 'text',
      LeadingComponent,
      TrailingComponent,
      ...rest
    }) => {
      const wrappingStyle: ViewStyle = useMemo(
        () => ({
          flexDirection: 'row',
          alignItems: 'center',
        }),
        [],
      );

      const inputStyleSheet = useMemo(
        () =>
          StyleSheet.flatten([
            style,
            {
              opacity: disabled ? 0.5 : 1,
            } as ViewStyle,
          ]),
        [style, fullWidth, disabled],
      );

      return (
        <View
          style={[
            // removeVerticalPaddingProps(inputStyleSheet),
            keepBorderProps(style),
            wrappingStyle,
          ]}
        >
          {LeadingComponent}
          <BaseComponent
            style={innerProps(inputStyleSheet)}
            editable={!disabled}
            placeholderTextColor={disabled ? 'gray' : 'black'}
            accessible={accessible}
            accessibilityRole={accessibilityRole}
            {...rest}
          />
          {TrailingComponent}
        </View>
      );
    },
  );
};

export default createTextInput;
