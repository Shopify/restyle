import React from 'react';
import {View, ViewProps} from 'react-native';
import {StyleFunctionContainer} from './types';
import useStyleSystem from './hooks/useStyleSystem';

const createStyleSystemComponent = <
  Props extends {},
  BaseComponentProps = ViewProps
>(
  styleFunctions: (StyleFunctionContainer | StyleFunctionContainer[])[],
  BaseComponent: React.ComponentType<BaseComponentProps> = View as any,
) => {
  const StyleSystemComponent = <
    OverrideComponentProps extends BaseComponentProps
  >({
    component = BaseComponent as any,
    ...rest
  }: {
    component?: React.ComponentType<OverrideComponentProps>;
    children?: React.ReactNode;
    style?: any;
  } & OverrideComponentProps &
    Props) => {
    const Component = component;
    const props = useStyleSystem(styleFunctions, rest);
    return <Component {...(props as OverrideComponentProps)} />;
  };
  type StyleSystemComponentType = typeof StyleSystemComponent;
  return StyleSystemComponent as (StyleSystemComponentType & {
    defaultProps?: Partial<React.ComponentProps<StyleSystemComponentType>>;
  });
};

export default createStyleSystemComponent;
