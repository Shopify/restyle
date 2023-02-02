import {BaseTheme, RestyleFunction, RNStyleProperty} from './types';
import {getResponsiveValue, StyleTransformFunction} from './responsiveHelpers';

// const memoizedMap = new Map();

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
    const value = getResponsiveValue(props[property], {
      theme,
      dimensions,
      themeKey,
      transform,
    });
    if (value === undefined) return {};

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
