import React, { useMemo } from 'react';
// import {Text} from 'react-native';
import {
  StyleSheet,
  // View,
  ViewStyle,
  TextStyle,
  View,
  Pressable,
} from 'react-native';

import createRestyleComponent from '../createRestyleComponent';
import {BaseTheme, RestyleFunctionContainer} from '../types';
// import {
//   // color,
//   // opacity,
//   spacing,
//   // typography,
//   // textShadow,
//   // visible,
//   // ColorProps,
//   // OpacityProps,
//   // SpacingProps,
//   // TextShadowProps,
//   // TypographyProps,
//   // VisibleProps,
//   // spacingShorthand,
//   // SpacingShorthandProps,
//   // layout,
//   // LayoutProps,
// } from '../restyleFunctions';
import createVariant, {VariantProps} from '../createVariant';
import createText from '../createText';

// type BaseTextProps<Theme extends BaseTheme> = ColorProps<Theme> &
//   OpacityProps<Theme> &
//   VisibleProps<Theme> &
//   TypographyProps<Theme> &
//   SpacingProps<Theme> &
//   LayoutProps<Theme> &
//   TextShadowProps<Theme> &
//   VariantProps<Theme, 'textVariants'>;

type BaseButtonProps<Theme extends BaseTheme> = VariantProps<
  Theme,
  'buttonVariants'
>;

export type ButtonProps<Theme extends BaseTheme> = BaseButtonProps<Theme>;

interface ExtraButtonProps {
  /**
   * Whether the button is disabled
   * @example
   * <Button disabled={true}>Disabled Button</Button>
   */
  disabled?: boolean;

  /**
   * Whether the button is in a loading state
   * @example
   * <Button loading={true}>Loading...</Button>
   */
  loading?: boolean;

  /**
   * Whether the button should take up the full width of its container
   * @example
   * <Button fullWidth={true}>Full Width Button</Button>
   */
  fullWidth?: boolean;

  /**
   * Custom component to display when the button is in a loading state
   * @example
   * <Button loading={true} LoadingComponent={<Spinner />}>Loading...</Button>
   */
  LoadingComponent?:(foregroundStyle: Pick<TextStyle, 'color'>) => React.ReactNode;

  /**
   * Required accessibility label for the button
   * @example
   * <Button accessibilityLabel="Submit form">Submit</Button>
   */
  accessibilityLabel: string;
}

export const buttonRestyleFunctions = [
  // color,
  // opacity,
  // visible,
  // typography,
  // spacing,
  // spacingShorthand,
  // textShadow,
  // layout,
  createVariant({themeKey: 'buttonVariants'}),
];

const TouchableComponent = Pressable;

const LOADER_WRAPPER_STYLE:ViewStyle = {alignItems: 'center', justifyContent: 'center', ...StyleSheet.absoluteFillObject};
const createButton = <
  Theme extends BaseTheme,
  Props = React.ComponentProps<typeof TouchableComponent> & ExtraButtonProps,
>(
  BaseComponent: React.ComponentType<any> = TouchableComponent,
) => {
  const TextComponent = createText();
  return createRestyleComponent<
    ButtonProps<Theme> & Omit<Props, keyof ButtonProps<Theme>>,
    Theme
  >(
    buttonRestyleFunctions as RestyleFunctionContainer<
      ButtonProps<Theme>,
      Theme
    >[],
    ({children, disabled, fullWidth, style, loading, LoadingComponent:LoadingComponentFn, accessibilityRole = 'button', ...rest}) => {
      const wrappingStyleSheet = useMemo(() => StyleSheet.flatten([
        style,
        {
          width: fullWidth ? '100%' : 'auto',
          opacity: disabled ? 0.25 : 1,
          justifyContent: 'center',
          alignItems: 'center',
        } as ViewStyle,
      ]),[style, fullWidth, disabled]);

      const foregroundColorStyle = useMemo(() => ({color: wrappingStyleSheet.color, opacity: loading ? 0 : 1}),[wrappingStyleSheet.color, loading]);

      const LoadingComponent = useMemo(() => {
        if (loading) {
          return <View style={LOADER_WRAPPER_STYLE}>
            {LoadingComponentFn(foregroundColorStyle)}
          </View>
        }
        return null;
      },[loading, LoadingComponentFn, foregroundColorStyle]);

      return (
        <BaseComponent style={wrappingStyleSheet} disabled={disabled || loading} accessibilityRole={accessibilityRole} {...rest}>
          <TextComponent
            // this should prob not be hardcoded
            variant="button"
            style={foregroundColorStyle}>
            {children}
          </TextComponent>
          {LoadingComponent}
        </BaseComponent>
      );
    },
  );
};

export default createButton;
