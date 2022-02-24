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
    ({cleanProps, restyleProps}, key) => {
      if (omitPropertiesMap[key as keyof TProps]) {
        return {cleanProps, restyleProps: {...restyleProps, [key]: props[key]}};
      } else {
        return {cleanProps: {...cleanProps, [key]: props[key]}, restyleProps};
      }
    },
    {cleanProps: {}, restyleProps: {}} as {
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

  const restyled = useMemo(() => {
    const {cleanProps, restyleProps} = filterRestyleProps(
      props,
      composedRestyleFunction.propertiesMap,
    );
    const style = composedRestyleFunction.buildStyle(restyleProps, {
      theme,
      dimensions,
    });

    cleanProps.style = [style, props.style].filter(Boolean);
    return cleanProps;
  }, [composedRestyleFunction, props, dimensions, theme]);

  return restyled;
};

export default useRestyle;
