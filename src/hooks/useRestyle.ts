import {useMemo} from 'react';
import {StyleProp} from 'react-native';

import {BaseTheme, RestyleFunctionContainer, RNStyle} from '../types';
import composeRestyleFunctions from '../composeRestyleFunctions';
import {AllProps} from '../restyleFunctions';

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
    (acc, prop) => ({...acc, [prop]: true}),
    {} as Record<keyof TRestyleProps, boolean>,
  );

  return Object.keys(props).reduce(
    (acc, key) => {
      if (omittedProp[key as keyof TRestyleProps]) return acc;
      return {...acc, [key]: props[key]};
    },
    {} as Omit<TProps, keyof TRestyleProps>,
  );
};

const useRestyle = <
  Theme extends BaseTheme,
  TRestyleProps extends AllProps<Theme>,
  TProps extends TRestyleProps & {style?: StyleProp<RNStyle>}
>(
  restyleFunctions: (
    | RestyleFunctionContainer<TRestyleProps, Theme>
    | RestyleFunctionContainer<TRestyleProps, Theme>[])[],
  props: TProps,
): Omit<TProps, keyof TRestyleProps> => {
  const theme = useTheme<Theme>();

  const dimensions = useDimensions();

  const composedRestyleFunction = useMemo(
    () => composeRestyleFunctions<TRestyleProps, Theme>(restyleFunctions),
    [restyleFunctions],
  );

  const style = composedRestyleFunction.buildStyle(props, {theme, dimensions});
  const cleanProps = filterRestyleProps<TRestyleProps, TProps>(
    props,
    composedRestyleFunction.properties,
  );

  return {
    ...cleanProps,
    style: [style, props.style].filter(Boolean),
  };
};

export default useRestyle;
