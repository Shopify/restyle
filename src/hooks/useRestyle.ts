import {useMemo} from 'react';
import {ScaledSize, StyleProp, useWindowDimensions} from 'react-native';

import {tracerInstance} from '../tracer';
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
  tracerInstance.start('loop');
  for (const key in componentProps) {
    if (omitPropertiesMap[key as keyof TProps]) {
      restyleProps[key] = componentProps[key];
      serializedRestyleProps += `${String(key)}:${componentProps[key]};`;
    } else {
      cleanProps[key] = componentProps[key];
    }
  }
  tracerInstance.stop('loop');

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
  tracerInstance.start('useRestyle prepare');
  const theme = useTheme<Theme>();

  let dimensions: ScaledSize | null = null;
  if (Object.keys(theme.breakpoints).length > 0) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    dimensions = useWindowDimensions();
  }
  tracerInstance.stop('useRestyle prepare');
  // const dimensions = useWindowDimensions();

  tracerInstance.start('filterRestyleProps');
  const {cleanProps, restyleProps, serializedRestyleProps} = filterRestyleProps(
    props,
    composedRestyleFunction.propertiesMap,
  );
  tracerInstance.stop('filterRestyleProps');

  tracerInstance.start('calculatedStyle memo');
  const calculatedStyle = useMemo(() => {
    tracerInstance.start('buildStyle');
    const style = composedRestyleFunction.buildStyle(restyleProps as TProps, {
      theme,
      dimensions,
    });

    const styleProp = props.style;
    if (typeof styleProp === 'function') {
      return (...args: any[]) => [style, styleProp(...args)].filter(Boolean);
    }
    tracerInstance.stop('buildStyle');
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
  tracerInstance.stop('calculatedStyle memo');

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cleanProps.style = calculatedStyle;
  return cleanProps;
};

export default useRestyle;
