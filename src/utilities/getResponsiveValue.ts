import {
  Dimensions,
  PropValue,
  ResponsiveValue,
  ResponsiveBaseTheme,
  StyleTransformFunction,
} from '../types';

import {getThemeValue} from './getThemeValue';
import {getValueForScreenSize} from './getValueForScreenSize';
import {isResponsiveObjectValue} from './isResponsiveObjectValue';

type ValueOf<T> = T[keyof T];

/**
 * Gets actual value for a given `themeKey` based on `breakpoints` and current `dimensions`.
 */
export const getResponsiveValue = <
  TVal extends PropValue,
  Theme extends ResponsiveBaseTheme,
  K extends keyof Theme | undefined,
>(
  propValue: ResponsiveValue<TVal, Theme['breakpoints']>,
  {
    theme,
    transform,
    dimensions,
    themeKey,
  }: {
    theme: Theme;
    transform?: StyleTransformFunction<Theme, K, TVal>;
    dimensions: Dimensions;
    themeKey?: K;
  },
):
  | (K extends keyof Theme ? ValueOf<Theme[K]> : never)
  | TVal
  | null
  | undefined => {
  const val = isResponsiveObjectValue(propValue, theme)
    ? getValueForScreenSize({
        responsiveValue: propValue,
        breakpoints: theme.breakpoints,
        dimensions,
      })
    : propValue;

  return getThemeValue(val, {theme, transform, themeKey});
};
