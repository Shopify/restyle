import {useMemo} from 'react';
import {StyleProp} from 'react-native';

import {BaseTheme, RestyleFunctionContainer, RNStyle} from '../types';
import composeRestyleFunctions from '../composeRestyleFunctions';
import {getKeys} from '../typeHelpers';

import useDimensions from './useDimensions';
import useTheme from './useTheme';

const filterRestyleProps = <
  TRestyleProps,
  TProps extends Record<string, unknown> & TRestyleProps
>(
  props: TProps,
  omitList: (keyof TRestyleProps)[],
): Omit<TProps, keyof TRestyleProps> => {
  const omittedProp = omitList.reduce<Record<keyof TRestyleProps, boolean>>(
    (acc, prop) => {
      acc[prop] = true;
      return acc;
    },
    {} as Record<keyof TRestyleProps, boolean>,
  );

  return getKeys(props).reduce(
    (acc, key) => {
      if (!omittedProp[key as keyof TRestyleProps]) {
        acc[key] = props[key];
      }
      return acc;
    },
    {} as TProps,
  );
};

const useRestyle = <
  Theme extends BaseTheme,
  TRestyleProps extends Record<string, any>,
  TProps extends TRestyleProps & {style?: StyleProp<RNStyle>}
>(
  restyleFunctions: (
    | RestyleFunctionContainer<TRestyleProps, Theme>
    | RestyleFunctionContainer<TRestyleProps, Theme>[])[],
  props: TProps,
) => {
  const theme = useTheme<Theme>();

  const dimensions = useDimensions();

  const composedRestyleFunction = useMemo(
    () => composeRestyleFunctions(restyleFunctions),
    [restyleFunctions],
  );

  const style = composedRestyleFunction.buildStyle(props, {theme, dimensions});
  const cleanProps = filterRestyleProps(
    props,
    composedRestyleFunction.properties,
  );

  (cleanProps as TProps).style = [style, props.style].filter(Boolean);
  return cleanProps;
};

export default useRestyle;
