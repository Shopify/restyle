import {BaseTheme, RestyleFunctionContainer, RNStyleProperty} from './types';
import {getResponsiveValue, StyleTransformFunction} from './responsiveHelpers';

const createRestyleFunction = <
  Theme extends BaseTheme = BaseTheme,
  TProps extends Record<string, any> = Record<string, any>,
  P extends keyof TProps = keyof TProps,
  K extends keyof Theme | undefined = undefined
>({
  property,
  transform,
  styleProperty,
  themeKey,
}: {
  property: P;
  transform?: StyleTransformFunction<Theme, K, TProps[P]>;
  styleProperty?: RNStyleProperty;
  themeKey?: K;
}): RestyleFunctionContainer<TProps, Theme, P, K> => {
  const styleProp = styleProperty || property.toString();

  return {
    property,
    themeKey,
    variant: false,
    func: (props, {theme, dimensions}) => {
      const value = getResponsiveValue(props[property], {
        theme,
        dimensions,
        themeKey,
        transform,
      });
      if (value === undefined) return {};

      return {
        [styleProp]: value,
      };
    },
  };
};

export default createRestyleFunction;
