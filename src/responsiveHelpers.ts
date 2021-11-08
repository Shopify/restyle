import {
  AtLeastOneResponsiveValue,
  BaseTheme,
  Breakpoint,
  Dimensions,
  PropValue,
  ResponsiveValue,
} from './types';
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
  responsiveValue: AtLeastOneResponsiveValue<TVal, Theme>;
  breakpoints: Theme['breakpoints'];
  dimensions: Dimensions;
}): TVal | undefined => {
  const sortedBreakpoints = Object.entries(breakpoints).sort((valA, valB) => {
    const valAWidth = getWidth(valA[1]);
    const valBWidth = getWidth(valB[1]);

    return valAWidth - valBWidth;
  });

  const {width, height} = dimensions;
  return sortedBreakpoints.reduce<TVal | undefined>((acc, [key, value]) => {
    if (typeof value === 'object') {
      if (
        width >= value.width &&
        height >= value.height &&
        responsiveValue[key] !== undefined
      ) {
        return responsiveValue[key] as TVal;
      }
    } else if (width >= value && responsiveValue[key] !== undefined) {
      return responsiveValue[key] as TVal;
    }

    return acc;
  }, undefined);
};

export const isResponsiveObjectValue = <Theme extends BaseTheme, TVal>(
  val: ResponsiveValue<TVal, Theme>,
  theme: Theme,
): val is AtLeastOneResponsiveValue<TVal, Theme> => {
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
  if (transform) return transform({value: val, theme, themeKey});
  if (isThemeKey(theme, themeKey)) {
    if (val && theme[themeKey][val as string] === undefined)
      throw new Error(`Value '${val}' does not exist in theme['${themeKey}']`);

    return val ? theme[themeKey][val as string] : val;
  }

  return val;
};

function getWidth(value: Breakpoint) {
  if (typeof value === 'object') {
    return value.width;
  }

  return value;
}
