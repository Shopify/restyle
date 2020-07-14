import React from 'react';
import {View} from 'react-native';

import {BaseTheme, RestyleFunctionContainer} from './types';
import useRestyle from './hooks/useRestyle';

const createRestyleComponent = <
  Props extends Record<string, unknown>,
  Theme extends BaseTheme = BaseTheme
>(
  restyleFunctions: (
    | RestyleFunctionContainer<Props, Theme>
    | RestyleFunctionContainer<Props, Theme>[])[],
  BaseComponent: React.ComponentType<any> = View,
) => {
  const RestyleComponent = (
    props: {
      style?: any;
    } & Props,
  ) => {
    const passedProps = useRestyle(restyleFunctions, props);
    return <BaseComponent {...passedProps} />;
  };
  type RestyleComponentType = typeof RestyleComponent;
  return RestyleComponent as (RestyleComponentType & {
    defaultProps?: Partial<React.ComponentProps<RestyleComponentType>>;
  });
};

export default createRestyleComponent;
