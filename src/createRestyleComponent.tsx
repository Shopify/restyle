import React from 'react';
import {View} from 'react-native';

import {RestyleFunctionContainer} from './types';
import useRestyle from './hooks/useRestyle';

const createRestyleComponent = <Props extends {}>(
  restyleFunctions: (RestyleFunctionContainer | RestyleFunctionContainer[])[],
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
