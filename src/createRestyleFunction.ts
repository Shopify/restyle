import {BaseTheme, Dimensions, RestyleFunction, RNStyleProperty} from './types';
import {getResponsiveValue, StyleTransformFunction} from './responsiveHelpers';

const getMemoizedMapHashKey = (
  dimensions: Dimensions | null,
  themeKey?: string,
  property?: string,
  value?: string | number | boolean,
) => {
  const dimensionsString =
    dimensions === null ? '' : `${dimensions.height}x${dimensions.width}`;
  if (themeKey == null || property == null || value == null) {
    return null;
  }

  return `${dimensionsString}-${themeKey}-${property}-${value}`;
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const unsafeTheme: Theme & {
      unsafeMemoizedMap: {[key: string]: any} | null;
    } = theme;
    if (unsafeTheme.unsafeMemoizedMap == null) {
      unsafeTheme.unsafeMemoizedMap = {};
    }

    let memoizedMapHashKey;

    memoizedMapHashKey = getMemoizedMapHashKey(
      dimensions,
      String(themeKey),
      String(property),
      String(props[property]),
    );

    if (
      typeof themeKey === 'string' &&
      typeof property === 'string' &&
      themeKey != null &&
      property != null &&
      props[property] != null
    ) {
      memoizedMapHashKey = getMemoizedMapHashKey(
        dimensions,
        themeKey,
        property,
        props[property],
      );

      if (memoizedMapHashKey != null) {
        const memoizedValue = unsafeTheme.unsafeMemoizedMap[memoizedMapHashKey];
        if (memoizedValue != null) {
          return memoizedValue;
        }
      }
    }
    const value = getResponsiveValue(props[property], {
      theme,
      dimensions,
      themeKey,
      transform,
    });
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

export default createRestyleFunction;
