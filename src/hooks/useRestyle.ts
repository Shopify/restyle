import {useMemo, useRef} from 'react';
import {StyleProp, ViewStyle, TextStyle, ImageStyle} from 'react-native';

import {BaseTheme, RNStyle, Dimensions} from '../types';
import {getKeys} from '../typeHelpers';

import useDimensions from './useDimensions';
import useTheme from './useTheme';

const filterRestyleProps = <
  TRestyleProps,
  TProps extends Record<string, unknown> & TRestyleProps
>(
  props: TProps,
  omitPropertiesMap: Record<keyof TProps, boolean>,
) => {
  return getKeys(props).reduce(
    ({cleanProps, restyleProps, serialized}, key) => {
      if (omitPropertiesMap[key as keyof TProps]) {
        return {
          serialized: `${serialized}${key}:${props[key]};`,
          cleanProps,
          restyleProps: {...restyleProps, [key]: props[key]},
        };
      } else {
        return {
          serialized,
          cleanProps: {...cleanProps, [key]: props[key]},
          restyleProps,
        };
      }
    },
    {cleanProps: {}, restyleProps: {}, serialized: ''} as {
      serialized: string;
      cleanProps: TProps;
      restyleProps: TRestyleProps;
    },
  );
};

const useRestyle = <
  Theme extends BaseTheme,
  TRestyleProps extends Record<string, any>,
  TProps extends TRestyleProps & {style?: StyleProp<RNStyle>}
>(
  composedRestyleFunction: {
    buildStyle: <TInputProps extends TProps>(
      props: TInputProps,
      {
        theme,
        dimensions,
      }: {
        theme: Theme;
        dimensions: Dimensions;
      },
    ) => ViewStyle | TextStyle | ImageStyle;
    properties: (keyof TProps)[];
    propertiesMap: Record<keyof TProps, boolean>;
  },
  props: TProps,
) => {
  const theme = useTheme<Theme>();
  const dimensions = useDimensions();
  const restylePropsRef = useRef<TProps>();

  const {restyleProps, cleanProps, serialized} = filterRestyleProps(
    props,
    composedRestyleFunction.propertiesMap,
  );

  restylePropsRef.current = restyleProps as TProps;

  const calculatedStyle = useMemo(() => {
    const style = composedRestyleFunction.buildStyle(restylePropsRef.current!, {
      theme,
      dimensions,
    });

    return [style, props.style].filter(Boolean);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [composedRestyleFunction, theme, dimensions, props.style, serialized]);

  return {
    ...cleanProps,
    style: calculatedStyle,
  };
};

export default useRestyle;
