import {StyleSheet} from 'react-native';

import {tracerInstance} from './tracer';
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
  const propertiesMap = properties.reduce(
    (acc, prop) => ({...acc, [prop]: true}),
    {} as {[key in keyof TProps]: true},
  );
  const funcsMap = flattenedRestyleFunctions.reduce(
    (acc, each) => ({[each.property]: each.func, ...acc}),
    {} as {[key in keyof TProps]: RestyleFunction<TProps, Theme, string>},
  );

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
    const styles = {};
    const options = {theme, dimensions};
    // eslint-disable-next-line guard-for-in
    for (const key in props) {
      let mappedProps;
      tracerInstance.start('map props');
      mappedProps = funcsMap[key](props, 1, options);
      tracerInstance.stop('map props');
      tracerInstance.start('map props', 'storing object');
      mappedProps = funcsMap[key](props, 2, options);
      tracerInstance.stop('map props', 'storing object');
      // eslint-disable-next-line guard-for-in
      for (const mappedKey in mappedProps) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        styles[mappedKey as keyof TProps] = mappedProps[mappedKey];
      }
    }
    // tracerInstance.stop('composeRestyleFunctions forloop');
    // tracerInstance.stop(
    //   'composeRestyleFunctions buildStyle',
    //   'marek variation',
    // );
    // console.log('output', styles);

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
