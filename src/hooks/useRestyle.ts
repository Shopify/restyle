import {useMemo} from 'react';
import {StyleProp, useWindowDimensions} from 'react-native';

import {BaseTheme, RNStyle, Dimensions} from '../types';
import {tracerInstance} from '../tracer';

import useTheme from './useTheme';

const filterRestyleProps = <
  TRestyleProps,
  TProps extends {[key: string]: unknown} & TRestyleProps,
>(
  componentProps: TProps,
  omitPropertiesMap: {[key in keyof TProps]: boolean},
) => {
  // const props = omitPropertiesMap.variant
  //   ? {variant: 'defaults', ...componentProps}
  //   : componentProps;
  // let keys;
  // tracerInstance.start('filterRestyleProps reduce');
  // keys = getKeys(props).reduce(
  //   ({cleanProps, restyleProps, serializedRestyleProps}, key) => {
  //     if (omitPropertiesMap[key as keyof TProps]) {
  //       return {
  //         cleanProps,
  //         restyleProps: {...restyleProps, [key]: props[key]},
  //         serializedRestyleProps: `${serializedRestyleProps}${String(key)}:${
  //           props[key]
  //         };`,
  //       };
  //     } else {
  //       return {
  //         cleanProps: {...cleanProps, [key]: props[key]},
  //         restyleProps,
  //         serializedRestyleProps,
  //       };
  //     }
  //   },
  //   {cleanProps: {}, restyleProps: {}, serializedRestyleProps: ''} as {
  //     cleanProps: TProps;
  //     restyleProps: TRestyleProps;
  //     serializedRestyleProps: string;
  //   },
  // );
  // tracerInstance.stop('filterRestyleProps reduce');
  // tracerInstance.start('filterRestyleProps reduce', 'marek variation');

  tracerInstance.start('filterRestyleProps reduce');
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

  const keys = {cleanProps, restyleProps, serializedRestyleProps};
  tracerInstance.stop('filterRestyleProps reduce');
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
        dimensions: Dimensions;
      },
    ) => RNStyle;
    properties: (keyof TProps)[];
    propertiesMap: {[key in keyof TProps]: boolean};
  },
  props: TProps,
) => {
  tracerInstance.start('useTheme hook');
  const theme = useTheme<Theme>();
  tracerInstance.stop('useTheme hook');

  tracerInstance.start('useWindowDimensions hook');
  let dimensions = {width: 0, height: 0};
  if (Object.keys(theme.breakpoints).length > 0) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    dimensions = useWindowDimensions();
  }
  // const dimensions = useWindowDimensions();

  tracerInstance.stop('useWindowDimensions hook');

  const {cleanProps, restyleProps, serializedRestyleProps} = filterRestyleProps(
    props,
    composedRestyleFunction.propertiesMap,
  );

  const calculatedStyle = useMemo(() => {
    tracerInstance.start('calculate style buildstyle');
    const style = composedRestyleFunction.buildStyle(restyleProps as TProps, {
      theme,
      dimensions,
    });
    tracerInstance.stop('calculate style buildstyle');

    tracerInstance.start('calculate style filter functions');
    const styleProp = props.style;
    if (typeof styleProp === 'function') {
      return (...args: any[]) => [style, styleProp(...args)].filter(Boolean);
    }
    tracerInstance.stop('calculate style filter functions');

    tracerInstance.start('calculate style filter booleans');
    const filteredStyle = [style, styleProp].filter(Boolean);
    tracerInstance.stop('calculate style filter booleans');

    return filteredStyle;

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
