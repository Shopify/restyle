import {useMemo} from 'react';

import {RestyleFunctionContainer} from '../types';
import composeRestyleFunctions from '../composeRestyleFunctions';

import useDimensions from './useDimensions';
import useTheme from './useTheme';

const filterRestyleProps = (
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

const useRestyle = (
  restyleFunctions: (RestyleFunctionContainer | RestyleFunctionContainer[])[],
  props: {[key: string]: any},
): {[key: string]: any} => {
  const theme = useTheme();
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
  return {
    ...cleanProps,
    style: [style, cleanProps.style].filter(Boolean),
  };
};

export default useRestyle;
