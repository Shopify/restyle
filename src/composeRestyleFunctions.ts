import {StyleSheet, ViewStyle} from 'react-native';

import {
  RestyleFunctionContainer,
  BaseTheme,
  Dimensions,
  RNStyle,
  RestyleFunction,
} from './types';
import {AllProps} from './restyleFunctions';

const composeRestyleFunctions = <
  Theme extends BaseTheme,
  TProps extends AllProps<Theme>,
>(
  restyleFunctions: (
    | RestyleFunctionContainer<TProps, Theme>
    | RestyleFunctionContainer<TProps, Theme>[]
  )[],
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
  const propertiesMap = properties.reduce((acc, prop) => {
    acc[prop] = true;
    return acc;
  }, {} as {[key in keyof TProps]: true});

  const funcsMap = flattenedRestyleFunctions.reduce((acc, each) => {
    acc[each.property] = each.func;
    return acc;
  }, {} as {[key in keyof TProps]: RestyleFunction<TProps, Theme, string>});

  // TInputProps is a superset of TProps since TProps are only the Restyle Props
  const buildStyle = (
    props: TProps,
    {
      theme,
      dimensions,
    }: {
      theme: Theme;
      dimensions: Dimensions | null;
    },
  ): RNStyle => {
    const styles: ViewStyle = {};
    const options = {theme, dimensions};
    // We make the assumption that the props object won't have extra prototype keys.
    // eslint-disable-next-line guard-for-in
    for (const key in props) {
      const mappedProps = funcsMap[key](props, options);
      // eslint-disable-next-line guard-for-in
      for (const mappedKey in mappedProps) {
        styles[mappedKey as keyof ViewStyle] = mappedProps[mappedKey];
      }
    }

    const {stylesheet} = StyleSheet.create({stylesheet: styles});
    return stylesheet;
  };
  return {
    buildStyle,
    properties,
    propertiesMap,
  };
};

export default composeRestyleFunctions;
