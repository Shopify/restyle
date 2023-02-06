import {BaseTheme, Dimensions, RestyleFunction, RNStyleProperty} from './types';
import {getResponsiveValue, StyleTransformFunction} from './responsiveHelpers';
import {tracerInstance} from './tracer';

const getMemoizedMapHashKey = (
  dimensions: Dimensions,
  themeKey?: string,
  property?: string,
  value?: string | number | boolean,
) => {
  const dimensionsString = `${dimensions.height}x${dimensions.width}`;
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
    tracerInstance.start('createRestyleFunction cached');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const unsafeTheme: Theme & {
      unsafeMemoizedMap: {[key: string]: any} | null;
      hit: number;
      miss: number;
    } = theme;
    if (unsafeTheme.unsafeMemoizedMap == null) {
      unsafeTheme.unsafeMemoizedMap = {};
      unsafeTheme.hit = 0;
      unsafeTheme.miss = 0;
    }

    // console.log('memoizedMapHashKey', memoizedMapHashKey);
    let memoizedMapHashKey;
    tracerInstance.start('cached function 1');

    tracerInstance.start('cached function 1', 'casting version');
    memoizedMapHashKey = getMemoizedMapHashKey(
      dimensions,
      String(themeKey),
      String(property),
      String(props[property]),
    );
    tracerInstance.stop('cached function 1', 'casting version');

    if (typeof themeKey === 'string' && typeof property === 'string') {
      memoizedMapHashKey = getMemoizedMapHashKey(
        dimensions,
        themeKey,
        property,
        props[property],
      );
      tracerInstance.stop('cached function 1');

      if (memoizedMapHashKey != null) {
        tracerInstance.start('cached function 2');
        const memoizedValue = unsafeTheme.unsafeMemoizedMap[memoizedMapHashKey];
        tracerInstance.stop('cached function 2');

        if (memoizedValue != null) {
          tracerInstance.start('cached function 3');
          const result = {[styleProp]: memoizedValue} as {
            [key in S | P]?: typeof value;
          };
          tracerInstance.stop('cached function 3');
          return result;
        }
      }
      tracerInstance.stop('cached function 1');
    }
    const value = getResponsiveValue(props[property], {
      theme,
      dimensions,
      themeKey,
      transform,
    });
    if (value === undefined) return {};

    if (memoizedMapHashKey != null) {
      unsafeTheme.unsafeMemoizedMap[memoizedMapHashKey] = value;
    }
    tracerInstance.stop('createRestyleFunction cached');
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
