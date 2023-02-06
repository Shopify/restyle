import {StyleSheet} from 'react-native';

import {
  RestyleFunctionContainer,
  BaseTheme,
  Dimensions,
  RNStyle,
  RestyleFunction,
} from './types';
import {AllProps} from './restyleFunctions';
import {tracerInstance} from './tracer';

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
      dimensions: Dimensions;
    },
  ): RNStyle => {
    // let styles;
    // tracerInstance.start('composeRestyleFunctions buildStyle');

    // // console.log('input', props);

    // styles = Object.keys(props).reduce(
    //   (styleObj, propKey) => ({
    //     ...styleObj,
    //     ...funcsMap[propKey as keyof TProps](props, {theme, dimensions}),
    //   }),
    //   {},
    // );
    // tracerInstance.stop('composeRestyleFunctions buildStyle');
    // tracerInstance.start(
    //   'composeRestyleFunctions buildStyle',
    //   'marek variation',
    // );
    // tracerInstance.start('composeRestyleFunctions forloop');
    const styles = {};
    tracerInstance.start('options');
    const options = {theme, dimensions};
    tracerInstance.stop('options');
    // eslint-disable-next-line guard-for-in
    for (const key in props) {
      tracerInstance.start('funcMap');
      const mappedProps = funcsMap[key](props, options);
      tracerInstance.stop('funcMap');
      // eslint-disable-next-line guard-for-in
      for (const mappedKey in mappedProps) {
        tracerInstance.start('stylesMap');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        styles[mappedKey as keyof TProps] = mappedProps[mappedKey];
        tracerInstance.stop('stylesMap');
      }
    }
    // tracerInstance.stop('composeRestyleFunctions forloop');
    // tracerInstance.stop(
    //   'composeRestyleFunctions buildStyle',
    //   'marek variation',
    // );
    // console.log('output', styles);

    tracerInstance.start('composeRestyleFunctions stylesheet');
    const {stylesheet} = StyleSheet.create({stylesheet: styles});
    tracerInstance.stop('composeRestyleFunctions stylesheet');
    return stylesheet;
  };
  return {
    buildStyle,
    properties,
    propertiesMap,
  };
};

export default composeRestyleFunctions;
