import {
  RestyleFunctionContainer,
  BaseTheme,
  Dimensions,
  RNStyle,
} from './types';

const composeRestyleFunctions = <
  TProps extends Record<string, unknown>,
  Theme extends BaseTheme = BaseTheme
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
    return funcs.reduce((acc, func) => {
      return {...acc, ...func(props, {theme, dimensions})};
    }, {});
  };
  return {
    buildStyle,
    properties,
  };
};

export default composeRestyleFunctions;
