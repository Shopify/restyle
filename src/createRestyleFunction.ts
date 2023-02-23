import {getThemeValue} from './utilities';
import {
  BaseTheme,
  Dimensions,
  ResponsiveBaseTheme,
  RestyleFunction,
  RNStyleProperty,
  StyleTransformFunction,
} from './types';
import {getResponsiveValue} from './utilities/getResponsiveValue';

const getMemoizedMapHashKey = (
  dimensions: Dimensions | null,
  themeKey: string,
  property: string,
  value: string | number | boolean,
) => {
  return `${dimensions?.height}x${dimensions?.width}-${themeKey}-${property}-${value}`;
};

type ThemeWithMemoization<Theme extends BaseTheme> = Theme & {
  unsafeMemoizedMap: {[key: string]: any} | null;
};

const createRestyleFunction = <
  Theme extends BaseTheme = BaseTheme,
  TProps extends {[key: string]: any} = {[key: string]: any},
  P extends keyof TProps = keyof TProps,
  K extends keyof Theme | undefined = undefined,
  S extends RNStyleProperty = RNStyleProperty,
>({
  property,
  transform,
  styleProperty,
  themeKey,
}: {
  property: P;
  transform?: StyleTransformFunction<Theme, K, TProps[P]>;
  styleProperty?: S;
  themeKey?: K;
}) => {
  const styleProp = styleProperty || property.toString();

  const func: RestyleFunction<TProps, Theme, S | P> = (
    props,
    {theme, dimensions},
  ) => {
    // We reuse the theme object for saving the memoized values.
    const unsafeTheme: ThemeWithMemoization<Theme> =
      theme as ThemeWithMemoization<Theme>;
    if (unsafeTheme.unsafeMemoizedMap == null) {
      unsafeTheme.unsafeMemoizedMap = {};
    }

    const memoizedMapHashKey = (() => {
      if (
        themeKey &&
        property &&
        props[property] &&
        typeof themeKey === 'string' &&
        typeof property === 'string'
      ) {
        return getMemoizedMapHashKey(
          dimensions,
          String(themeKey),
          String(property),
          String(props[property]),
        );
      } else {
        return null;
      }
    })();

    if (memoizedMapHashKey != null) {
      const memoizedValue = unsafeTheme.unsafeMemoizedMap[memoizedMapHashKey];
      if (memoizedValue != null) {
        return memoizedValue;
      }
    }

    const value = (() => {
      if (isResponsiveTheme(theme) && dimensions) {
        return getResponsiveValue(props[property], {
          theme,
          dimensions,
          themeKey,
          transform,
        });
      } else {
        return getThemeValue(props[property], {theme, themeKey, transform});
      }
    })();
    if (value === undefined) return {};

    if (memoizedMapHashKey != null) {
      unsafeTheme.unsafeMemoizedMap[memoizedMapHashKey] = {
        [styleProp]: value,
      };
      return unsafeTheme.unsafeMemoizedMap[memoizedMapHashKey];
    }
    return {
      [styleProp]: value,
    } as {[key in S | P]?: typeof value};
  };

  return {
    property,
    themeKey,
    variant: false,
    func,
  };
};

function isResponsiveTheme(
  theme: BaseTheme | ResponsiveBaseTheme,
): theme is ResponsiveBaseTheme {
  if (theme.breakpoints !== undefined) {
    return true;
  }
  return false;
}

export default createRestyleFunction;
