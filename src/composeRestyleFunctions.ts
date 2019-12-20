import {RestyleFunctionContainer, BaseTheme, Dimensions} from './types';

const composeRestyleFunctions = (
  restyleFunctions: (RestyleFunctionContainer | RestyleFunctionContainer[])[],
) => {
  const flattenedRestyleFunctions = restyleFunctions.reduce(
    (acc: RestyleFunctionContainer[], item) => {
      return acc.concat(item);
    },
    [],
  ) as RestyleFunctionContainer[];

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

  const buildStyle = (
    props: {[key: string]: any},
    {
      theme,
      dimensions,
    }: {
      theme: BaseTheme;
      dimensions: Dimensions;
    },
  ) => {
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
