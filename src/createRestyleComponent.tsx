import React from 'react';
import {View} from 'react-native';

import {BaseTheme, RestyleFunctionContainer} from './types';
import useRestyle from './hooks/useRestyle';

const createRestyleComponent = <
  Props extends Record<string, any>,
  Theme extends BaseTheme
>(
  restyleFunctions: (
    | RestyleFunctionContainer<Props, Theme>
    | RestyleFunctionContainer<Props, Theme>[])[],
  BaseComponent: React.ComponentType<any> = View,
) => {
  const RestyleComponent = React.forwardRef((props: Props, ref) => {
    const passedProps = useRestyle(restyleFunctions, props);
    return <BaseComponent ref={ref} {...passedProps} />;
  });
  type RestyleComponentType = typeof RestyleComponent;
  return RestyleComponent as RestyleComponentType & {
    defaultProps?: Partial<React.ComponentProps<RestyleComponentType>>;
  };
};

export default createRestyleComponent;
