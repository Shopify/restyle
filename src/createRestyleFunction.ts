import {BaseTheme, RestyleFunction, RNStyleProperty} from './types';
import {getResponsiveValue, StyleTransformFunction} from './responsiveHelpers';

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
    const memoizedMapHashKey = `${dimensions.height}x${
      dimensions.width
    }-${String(themeKey)}-${String(property)}-${String(props[property])}}`;
    const memoizedValue = unsafeTheme.unsafeMemoizedMap[memoizedMapHashKey];
    if (memoizedValue != null) {
      return {[styleProp]: memoizedValue} as {[key in S | P]?: typeof value};
    }

    const value = getResponsiveValue(props[property], {
      theme,
      dimensions,
      themeKey,
      transform,
    });
    if (value === undefined) return {};

    unsafeTheme.unsafeMemoizedMap[memoizedMapHashKey] = value;

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
