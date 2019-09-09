import {useMemo} from 'react';
import {StyleFunctionContainer} from '../types';
import composeStyleFunctions from '../composeStyleFunctions';
import useDimensions from './useDimensions';
import useTheme from './useTheme';

const filterStyleSystemProps = (
  props: {[key: string]: any},
  omitList: string[],
) => {
  const omittedProp = omitList.reduce<{[key: string]: boolean}>(
    (acc, prop) => ({...acc, [prop]: true}),
    {},
  );
  return Object.keys(props).reduce(
    (acc, key) => {
      if (omittedProp[key]) return acc;
      return {...acc, [key]: props[key]};
    },
    {} as {[key: string]: any},
  );
};

const useStyleSystem = (
  styleFunctions: (StyleFunctionContainer | StyleFunctionContainer[])[],
  props: {[key: string]: any},
): {[key: string]: any} => {
  const theme = useTheme();
  const dimensions = useDimensions();

  const composedStyleFunction = useMemo(
    () => composeStyleFunctions(styleFunctions),
    [styleFunctions],
  );

  const style = composedStyleFunction.buildStyle(props, {theme, dimensions});
  const cleanProps = filterStyleSystemProps(
    props,
    composedStyleFunction.properties,
  );
  return {
    ...cleanProps,
    style: [style, cleanProps.style].filter(Boolean),
  };
};

export default useStyleSystem;
