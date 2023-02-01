import {useMemo} from 'react';
import {StyleProp, useWindowDimensions} from 'react-native';

import {BaseTheme, RNStyle, Dimensions} from '../types';

import useTheme from './useTheme';

const filterRestyleProps = <
  TRestyleProps,
  TProps extends {[key: string]: unknown} & TRestyleProps,
>(
  componentProps: TProps,
  omitPropertiesMap: {[key in keyof TProps]: boolean},
) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const cleanProps: TProps = {};
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const restyleProps: TProps = {};
  let serializedRestyleProps = '';
  if (omitPropertiesMap.variant) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    restyleProps.variant = componentProps.variant ?? 'defaults';
  }
  for (const key in componentProps) {
    if (omitPropertiesMap[key as keyof TProps]) {
      restyleProps[key] = componentProps[key];
      serializedRestyleProps += `${String(key)}:${componentProps[key]};`;
    } else {
      cleanProps[key] = componentProps[key];
    }
  }

  return {cleanProps, restyleProps, serializedRestyleProps};
};

const useRestyle = <
  Theme extends BaseTheme,
  TRestyleProps extends {[key: string]: any},
  TProps extends TRestyleProps & {style?: StyleProp<RNStyle>},
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
    ) => RNStyle;
    properties: (keyof TProps)[];
    propertiesMap: {[key in keyof TProps]: boolean};
  },
  props: TProps,
) => {
  const theme = useTheme<Theme>();
  const dimensions = useWindowDimensions();

  const {cleanProps, restyleProps, serializedRestyleProps} = filterRestyleProps(
    props,
    composedRestyleFunction.propertiesMap,
  );

  const calculatedStyle = useMemo(() => {
    const style = composedRestyleFunction.buildStyle(restyleProps as TProps, {
      theme,
      dimensions,
    });

    const styleProp = props.style;
    if (typeof styleProp === 'function') {
      return (...args: any[]) => [style, styleProp(...args)].filter(Boolean);
    }
    return [style, styleProp].filter(Boolean);

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
