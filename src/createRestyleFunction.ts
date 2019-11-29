import {
  ResponsiveValue,
  BaseTheme,
  Dimensions,
  RestyleFunctionContainer,
} from './types';

type StyleTransformFunction = (params: {
  value: any;
  theme: BaseTheme;
  themeKey?: string;
}) => any;

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

const getValue = <Theme extends BaseTheme>(
  propValue: ResponsiveValue<string | number, Theme>,
  {
    theme,
    transform,
    dimensions,
    themeKey,
  }: {
    theme: Theme;
    transform?: StyleTransformFunction;
    dimensions: Dimensions;
    themeKey?: string;
  },
) => {
  const val = isResponsiveObjectValue(propValue, theme)
    ? getValueForScreenSize({
        responsiveValue: propValue,
        breakpoints: theme.breakpoints,
        dimensions,
      })
    : propValue;
  if (transform) return transform({value: val, theme, themeKey});
  if (themeKey && theme[themeKey]) {
    if (val && !theme[themeKey][val])
      throw new Error(`Value '${val}' does not exist in theme['${themeKey}']`);

    return val ? theme[themeKey][val] : val;
  }

  return val;
};

const createRestyleFunction = ({
  property,
  transform,
  styleProperty = property,
  themeKey,
}: {
  property: string;
  transform?: StyleTransformFunction;
  styleProperty?: string;
  themeKey?: string;
}): RestyleFunctionContainer => {
  return {
    property,
    themeKey,
    variant: false,
    func: (
      props: any,
      {theme, dimensions}: {theme: BaseTheme; dimensions: Dimensions},
    ): {[key: string]: any} => {
      const value = getValue(props[property], {
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
