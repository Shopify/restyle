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
  const cleanProps: TProps = {} as TProps;
  const restyleProps: TProps & {variant?: unknown} = {} as TProps;
  let serializedRestyleProps = '';
  if (omitPropertiesMap.variant) {
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

  const keys = {cleanProps, restyleProps, serializedRestyleProps};
  return keys;
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
        dimensions: Dimensions | null;
      },
    ) => RNStyle;
    properties: (keyof TProps)[];
    propertiesMap: {[key in keyof TProps]: boolean};
  },
  props: TProps,
) => {
  const theme = useTheme<Theme>();

  // Theme should not change between renders, so we can disable rules-of-hooks
  // We want to avoid calling useWindowDimensions if breakpoints are not defined
  // as this hook is called extremely often and incurs some performance hit.
  const dimensions = theme.breakpoints
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useWindowDimensions()
    : null;

  const {cleanProps, restyleProps, serializedRestyleProps} = filterRestyleProps(
    props,
    composedRestyleFunction.propertiesMap,
  );

  const calculatedStyle: StyleProp<RNStyle> = useMemo(() => {
    const style = composedRestyleFunction.buildStyle(restyleProps as TProps, {
      theme,
      dimensions,
    });

    const styleProp: StyleProp<RNStyle> = props.style;
    if (typeof styleProp === 'function') {
      return ((...args: any[]) =>
        [style, styleProp(...args)].filter(Boolean)) as StyleProp<RNStyle>;
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

  cleanProps.style = calculatedStyle;
  return cleanProps;
};

export default useRestyle;
