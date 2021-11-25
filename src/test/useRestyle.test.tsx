import React, {ComponentPropsWithoutRef} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import useRestyle from '../hooks/useRestyle';
import {position, PositionProps} from '../restyleFunctions';
import createVariant, {VariantProps} from '../createVariant';

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
};
type Theme = typeof theme;

type Props = VariantProps<Theme, 'buttonVariants'> &
  PositionProps<Theme> & {
    title: string;
  } & ComponentPropsWithoutRef<typeof TouchableOpacity>;

const restyleFunctions = [
  position,
  createVariant({themeKey: 'buttonVariants'}),
];

function Button({title, ...rest}: Props) {
  const props = useRestyle(restyleFunctions, rest);
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
    expect(button.props.title).toStrictEqual('test');
  });
});
