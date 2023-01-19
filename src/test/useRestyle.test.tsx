import React, {ComponentPropsWithoutRef} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import useRestyle from '../hooks/useRestyle';
import {position, PositionProps} from '../restyleFunctions';
import createVariant, {VariantProps} from '../createVariant';
import composeRestyleFunctions from '../composeRestyleFunctions';

const theme = {
  colors: {},
  spacing: {},
  buttonVariants: {
    defaults: {},
  },
  breakpoints: {
    phone: 0,
    tablet: 376,
  },
  zIndices: {
    phone: 5,
  },
};
type Theme = typeof theme;

type Props = VariantProps<Theme, 'buttonVariants'> &
  PositionProps<Theme> &
  ComponentPropsWithoutRef<typeof TouchableOpacity>;

const restyleFunctions = [
  position,
  createVariant<Theme>({themeKey: 'buttonVariants'}),
];

const composedRestyleFunction = composeRestyleFunctions<Theme, Props>(
  restyleFunctions,
);

function Button({title, ...rest}: Props & {title: string}) {
  const props = useRestyle(composedRestyleFunction, rest);
  return (
    <TouchableOpacity {...props}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

function Screen() {
  return <Button title="test" position="absolute" />;
}

describe('Use restyle', () => {
  it('creates a button', () => {
    const button = Screen();
    expect(button.props.title).toBe('test');
  });
});
