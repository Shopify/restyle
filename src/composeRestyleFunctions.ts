import {StyleSheet} from 'react-native';

import {
  RestyleFunctionContainer,
  BaseTheme,
  Dimensions,
  RNStyle,
} from './types';
import {AllProps} from './restyleFunctions';

const composeRestyleFunctions = <
  Theme extends BaseTheme,
  TProps extends AllProps<Theme>
>(
  restyleFunctions: (
    | RestyleFunctionContainer<TProps, Theme>
    | RestyleFunctionContainer<TProps, Theme>[])[],
) => {
  const flattenedRestyleFunctions = restyleFunctions.reduce(
    (acc: RestyleFunctionContainer<TProps, Theme>[], item) => {
      return acc.concat(item);
    },
    [],
  );

  const properties = flattenedRestyleFunctions.map(styleFunc => {
    return styleFunc.property;
  });
  const funcs = flattenedRestyleFunctions
    .sort(
      (styleFuncA, styleFuncB) =>
        Number(styleFuncB.variant) - Number(styleFuncA.variant),
    )
    .map(styleFunc => {
      return styleFunc.func;
    });

  // TInputProps is a superset of TProps since TProps are only the Restyle Props
  const buildStyle = <TInputProps extends TProps>(
    props: TInputProps,
    {
      theme,
      dimensions,
    }: {
      theme: Theme;
      dimensions: Dimensions;
    },
  ): RNStyle => {
    const styles = funcs.reduce((acc, func) => {
      return Object.assign(acc, func(props, {theme, dimensions}));
    }, {});
    const {stylesheet} = StyleSheet.create({stylesheet: styles});
    return stylesheet;
  };
  return {
    buildStyle,
    properties,
  };
};

export default composeRestyleFunctions;
