import {useMemo} from 'react';
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
    ({cleanProps, restyleProps, serializedRestyleProps}, key) => {
      if (omitPropertiesMap[key as keyof TProps]) {
        return {
          cleanProps,
          restyleProps: {...restyleProps, [key]: props[key]},
          serializedRestyleProps: `${serializedRestyleProps}${key}:${props[key]};`,
        };
      } else {
        return {
          cleanProps: {...cleanProps, [key]: props[key]},
          restyleProps,
          serializedRestyleProps,
        };
      }
    },
    {cleanProps: {}, restyleProps: {}, serializedRestyleProps: ''} as {
      cleanProps: TProps;
      restyleProps: TRestyleProps;
      serializedRestyleProps: string;
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

  const {cleanProps, restyleProps, serializedRestyleProps} = filterRestyleProps(
    props,
    composedRestyleFunction.propertiesMap,
  );

  const calculatedStyle = useMemo(() => {
    const style = composedRestyleFunction.buildStyle(restyleProps as TProps, {
      theme,
      dimensions,
    });

    return [style, props.style].filter(Boolean);
    // We disable the exhaustive deps rule here in order to trigger the useMemo
    // when the serialized string of restyleProps changes instead of the object
    // reference which will change on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    theme,
    dimensions,
    props.style,
    serializedRestyleProps,
    composedRestyleFunction,
  ]);

  return {
    ...cleanProps,
    style: calculatedStyle,
  };
};

export default useRestyle;
