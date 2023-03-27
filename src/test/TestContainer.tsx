import React from 'react';
import {View, ViewProps} from 'react-native';

import useRestyle from '../hooks/useRestyle';
import createVariant, {VariantProps} from '../createVariant';
import composeRestyleFunctions from '../composeRestyleFunctions';
import {
  backgroundColor,
  BackgroundColorProps,
  BorderProps,
  spacing,
  SpacingProps,
} from '../restyleFunctions';

const palette = {
  purple: '#5A31F4',
  green: '#099C77',
  black: '#101010',
  white: '#FFF',
};

export const theme = {
  colors: {
    background: palette.purple,
  },
  spacing: {
    none: 0,
    m: 8,
  },
  breakpoints: {
    phone: 320,
    tablet: 768,
  },
  spacingVariant: {
    defaults: {},
    spacingParent: {
      padding: {
        phone: 'none',
        tablet: 'none',
      },
    },
    spacingNested: {
      padding: {
        phone: 'm',
        tablet: 'm',
      },
    },
  },
};
type Theme = typeof theme;

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  VariantProps<Theme, 'spacingVariant'>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  backgroundColor,
  createVariant({themeKey: 'spacingVariant'}),
]);

type Props = RestyleProps & ViewProps;

export const Container = ({children, ...rest}: Props) => {
  const props = useRestyle(restyleFunctions, rest);
  return <View {...props}>{children}</View>;
};
