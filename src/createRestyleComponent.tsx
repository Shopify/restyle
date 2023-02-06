import React from 'react';
import {View} from 'react-native';

import {tracerInstance} from './tracer';
import composeRestyleFunctions from './composeRestyleFunctions';
import {BaseTheme, RestyleFunctionContainer} from './types';
import useRestyle from './hooks/useRestyle';

const createRestyleComponent = <
  Props extends {[key: string]: any},
  Theme extends BaseTheme,
>(
  restyleFunctions: (
    | RestyleFunctionContainer<Props, Theme>
    | RestyleFunctionContainer<Props, Theme>[]
  )[],
  BaseComponent: React.ComponentType<any> = View,
) => {
  const composedRestyleFunction = composeRestyleFunctions(restyleFunctions);

  tracerInstance.start('RestyleComponent');
  const RestyleComponent = React.forwardRef(({props}: Props, ref) => {
      tracerInstance.start('useRestyle');

      const passedProps = useRestyle(composedRestyleFunction, props);
      tracerInstance.stop('useRestyle');
      return <BaseComponent ref={ref} {...passedProps} />;
    }),
  };
  tracerInstance.stop('RestyleComponent');
  type RestyleComponentType = typeof RestyleComponent;
  return RestyleComponent as RestyleComponentType & {
    defaultProps?: Partial<React.ComponentProps<RestyleComponentType>>;
  };
};

export default createRestyleComponent;
