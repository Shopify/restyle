import {StyleSheet} from 'react-native';

import {
  BaseTheme,
  ResponsiveValue,
  RestyleFunctionContainer,
  RestyleFunction,
  SafeVariants,
} from './types';
import createRestyleFunction from './createRestyleFunction';
import {all, AllProps} from './restyleFunctions';
import composeRestyleFunctions from './composeRestyleFunctions';

const allRestyleFunctions = composeRestyleFunctions(all);

// With Custom Prop Name
function createVariant<
  Theme extends BaseTheme,
  K extends keyof SafeVariants<Theme> = keyof SafeVariants<Theme>,
  P extends keyof any = keyof any
>(params: {
  property: P;
  themeKey: K;
  defaults?: AllProps<Theme>;
}): RestyleFunctionContainer<VariantProps<Theme, K, P>, Theme, P, K>;
// Without Custom Prop Name
function createVariant<
  Theme extends BaseTheme,
  K extends keyof SafeVariants<Theme> = keyof SafeVariants<Theme>
>(params: {
  themeKey: K;
  defaults?: AllProps<Theme>;
}): RestyleFunctionContainer<VariantProps<Theme, K>, Theme, 'variant', K>;
function createVariant<
  Theme extends BaseTheme,
  K extends keyof SafeVariants<Theme>,
  P extends keyof any,
  TProps extends VariantProps<Theme, K, P>
>({
  property = 'variant' as P,
  themeKey,
  defaults,
}: {
  property?: P;
  themeKey: K;
  defaults?: AllProps<Theme>;
}) {
  const styleFunction = createRestyleFunction<Theme, TProps, P, K>({
    property,
    themeKey,
  });
  const func: RestyleFunction<TProps, Theme> = (props, {theme, dimensions}) => {
    const expandedProps = styleFunction.func(props, {theme, dimensions})[
      property
    ];

    const variantDefaults = theme[themeKey]
      ? (theme[themeKey].defaults as Partial<AllProps<Theme>>)
      : {};

    if (!expandedProps && !defaults && !variantDefaults) return {};
    return StyleSheet.flatten(
      allRestyleFunctions.buildStyle(
        {...defaults, ...variantDefaults, ...expandedProps},
        {
          theme,
          dimensions,
        },
      ),
    );
  };
  return {
    property,
    themeKey,
    variant: true,
    func,
  };
}

export type VariantProps<
  Theme extends BaseTheme,
  K extends keyof Theme,
  Property extends keyof any = 'variant'
> = {
  [key in Property]?: ResponsiveValue<keyof Omit<Theme[K], 'defaults'>, Theme>;
};

export default createVariant;
