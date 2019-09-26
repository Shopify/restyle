import React from 'react';
import {View} from 'react-native';
import {StyleFunctionContainer} from './types';
import useStyleSystem from './hooks/useStyleSystem';

const createStyleSystemComponent = <Props extends {}>(
  styleFunctions: (StyleFunctionContainer | StyleFunctionContainer[])[],
  BaseComponent: React.ComponentType = View,
) => {
  const StyleSystemComponent = (
    props: {
      children?: React.ReactNode;
      style?: any;
    } & Props,
  ) => {
    const passedProps = useStyleSystem(styleFunctions, props);
    return <BaseComponent {...passedProps} />;
  };
  type StyleSystemComponentType = typeof StyleSystemComponent;
  return StyleSystemComponent as (StyleSystemComponentType & {
    defaultProps?: Partial<React.ComponentProps<StyleSystemComponentType>>;
  });
};

export default createStyleSystemComponent;
