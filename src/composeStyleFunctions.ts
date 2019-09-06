import {StyleFunctionContainer, BaseTheme, Dimensions} from './types';

const composeStyleFunctions = (
  styleFunctions: (StyleFunctionContainer | StyleFunctionContainer[])[],
) => {
  const flattenedStyleFunctions = styleFunctions.reduce(
    (acc: StyleFunctionContainer[], item) => {
      return acc.concat(item);
    },
    [],
  ) as StyleFunctionContainer[];

  const properties = flattenedStyleFunctions.map(styleFunc => {
    return styleFunc.property;
  });
  const funcs = flattenedStyleFunctions
    .sort(
      (styleFuncA, styleFuncB) =>
        Number(styleFuncB.variant) - Number(styleFuncA.variant),
    )
    .map(styleFunc => {
      return styleFunc.func;
    });

  const buildStyle = ({
    props,
    theme,
    dimensions,
  }: {
    props: {[key: string]: any};
    theme: BaseTheme;
    dimensions: Dimensions;
  }) => {
    return funcs.reduce((acc, func) => {
      return {...acc, ...func(props, {theme, dimensions})};
    }, {});
  };
  return {
    buildStyle,
    properties,
  };
};

export default composeStyleFunctions;
