import {BaseTheme, Dimensions, PropValue, ResponsiveValue} from './types';
import {getKeys} from './typeHelpers';

export type StyleTransformFunction<
  Theme extends BaseTheme,
  K extends keyof Theme | undefined,
  TVal
> = (params: {
  value: TVal | undefined | null;
  theme: Theme;
  themeKey?: K;
}) => TVal | undefined | null;

type ValueOf<T> = T[keyof T];

function isThemeKey<Theme extends BaseTheme>(
  theme: Theme,
  K: keyof Theme | undefined,
): K is keyof Theme {
  return theme[K as keyof Theme];
}

export const getValueForScreenSize = <Theme extends BaseTheme, TVal>({
  responsiveValue,
  breakpoints,
  dimensions,
}: {
  responsiveValue: {[key in keyof Theme['breakpoints']]?: TVal};
  breakpoints: Theme['breakpoints'];
  dimensions: Dimensions;
}): TVal | undefined => {
  const sortedBreakpoints = Object.entries(breakpoints).sort((valA, valB) => {
    return valA[1] - valB[1];
  });
  const {width} = dimensions;
  return sortedBreakpoints.reduce<TVal | undefined>(
    (acc, [breakpoint, minWidth]) => {
      if (width >= minWidth && responsiveValue[breakpoint] !== undefined)
        return responsiveValue[breakpoint] as TVal;
      return acc;
    },
    undefined,
  );
};

export const isResponsiveObjectValue = <Theme extends BaseTheme, TVal>(
  val: ResponsiveValue<TVal, Theme>,
  theme: Theme,
): val is {[Key in keyof Theme['breakpoints']]?: TVal} => {
  if (!val) return false;
  if (typeof val !== 'object') return false;
  return getKeys(val).reduce((acc: boolean, key) => {
    return acc && theme.breakpoints[key as string] !== undefined;
  }, true);
};

export const getResponsiveValue = <
  TVal extends PropValue,
  Theme extends BaseTheme,
  K extends keyof Theme | undefined
>(
  propValue: ResponsiveValue<TVal, Theme>,
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
  | TVal
  | (K extends keyof Theme ? ValueOf<Theme[K]> : never)
  | null
  | undefined => {
  const val = isResponsiveObjectValue(propValue, theme)
    ? getValueForScreenSize({
        responsiveValue: propValue,
        breakpoints: theme.breakpoints,
        dimensions,
      })
    : propValue;
  if (transform) return transform({value: val, theme, themeKey});
  if (isThemeKey(theme, themeKey)) {
    if (val && theme[themeKey][val as string] === undefined)
      throw new Error(`Value '${val}' does not exist in theme['${themeKey}']`);

    return val ? theme[themeKey][val as string] : val;
  }

  return val;
};
