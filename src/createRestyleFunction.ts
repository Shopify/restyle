import {
  ResponsiveValue,
  BaseTheme,
  Dimensions,
  RestyleFunctionContainer,
} from './types';

type StyleTransformFunction<
  Theme extends BaseTheme,
  K extends keyof Theme | undefined
> = (params: {value: any; theme: Theme; themeKey?: K}) => any;

const getValueForScreenSize = ({
  responsiveValue,
  breakpoints,
  dimensions,
}: {
  responsiveValue: {[key in keyof BaseTheme['breakpoints']]: any};
  breakpoints: BaseTheme['breakpoints'];
  dimensions: Dimensions;
}) => {
  const sortedBreakpoints = Object.entries(breakpoints).sort((valA, valB) => {
    return valA[1] - valB[1];
  });
  const {width} = dimensions;
  return sortedBreakpoints.reduce((acc, [breakpoint, minWidth]) => {
    if (width >= minWidth && responsiveValue[breakpoint] !== undefined)
      return responsiveValue[breakpoint];
    return acc;
  }, null);
};

const isResponsiveObjectValue = <Theme extends BaseTheme>(
  val: ResponsiveValue<any, Theme>,
  theme: Theme,
): val is {[key: string]: any} => {
  if (typeof val !== 'object') return false;
  return Object.keys(val).reduce((acc: boolean, key) => {
    return acc && theme.breakpoints[key] !== undefined;
  }, true);
};

type PropValue = string | number | undefined | null;

function isThemeKey<Theme extends BaseTheme>(
  theme: Theme,
  K: keyof Theme | undefined,
): K is keyof Theme {
  return theme[K as keyof Theme];
}

const getValue = <Theme extends BaseTheme, K extends keyof Theme | undefined>(
  propValue: ResponsiveValue<PropValue, Theme>,
  {
    theme,
    transform,
    dimensions,
    themeKey,
  }: {
    theme: Theme;
    transform?: StyleTransformFunction<Theme, K>;
    dimensions: Dimensions;
    themeKey?: K;
  },
): PropValue => {
  const val = isResponsiveObjectValue(propValue, theme)
    ? getValueForScreenSize({
        responsiveValue: propValue,
        breakpoints: theme.breakpoints,
        dimensions,
      })
    : propValue;
  if (transform) return transform({value: val, theme, themeKey});
  if (isThemeKey(theme, themeKey)) {
    if (val && theme[themeKey][val] === undefined)
      throw new Error(`Value '${val}' does not exist in theme['${themeKey}']`);

    return val ? theme[themeKey][val] : val;
  }

  return val;
};

const createRestyleFunction = <
  Theme extends BaseTheme = BaseTheme,
  TProps extends Record<string, unknown> = Record<string, unknown>,
  P extends keyof TProps = keyof TProps,
  K extends keyof Theme | undefined = undefined
>({
  property,
  transform,
  styleProperty = property.toString(),
  themeKey,
}: {
  property: P;
  transform?: StyleTransformFunction<Theme, K>;
  styleProperty?: string;
  themeKey?: K;
}): RestyleFunctionContainer<TProps, Theme, P, K> => {
  return {
    property,
    themeKey,
    variant: false,
    func: (props, {theme, dimensions}) => {
      const value = getValue(props[property] as PropValue, {
        theme,
        dimensions,
        themeKey,
        transform,
      });
      if (value === undefined) return {};
      return {
        [styleProperty]: value,
      };
    },
  };
};

export default createRestyleFunction;
