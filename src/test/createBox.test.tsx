import React from 'react';
import {create as render} from 'react-test-renderer';
import {View as RNView} from 'react-native';

import createTheme from '../createTheme';
import createBox from '../createBox';
import {ThemeProvider} from '../context';

const palette = {
  black: '#000000',
  borderBlack: '#000001',
  grey: '#808080',
};

const baseTheme = {
  colors: {
    black: palette.black,
    grey: palette.grey,
  },
  spacing: {
    s: 4,
    m: 8,
  },
};
const theme = createTheme(baseTheme);

type Theme = typeof theme;

const Box = createBox<Theme>();

const borderTheme = createTheme({
  //   ...baseTheme,
  colors: {},
  spacing: {},
  borderColors: {
    borderBlack: palette.borderBlack,
  },
});
type BorderTheme = typeof borderTheme;
const BorderBox = createBox<BorderTheme>();

describe('createBox', () => {
  it('creates a bare Box component', () => {
    const {root} = render(
      <ThemeProvider theme={theme}>
        <Box />
      </ThemeProvider>,
    );

    expect(root.findByType(RNView)).not.toBeNull();
  });

  it('uses a color value from the theme', () => {
    const {root} = render(
      <ThemeProvider theme={theme}>
        <Box backgroundColor="black" borderColor="black" />
      </ThemeProvider>,
    );

    expect(root.findByType(RNView).props.style).toStrictEqual([
      {
        backgroundColor: palette.black,
        borderColor: palette.black,
      },
    ]);
  });

  it('throws a TS error when trying to use a non-border color', () => {
    expect(() =>
      render(
        <ThemeProvider theme={borderTheme}>
          {/* @ts-expect-error only borderColors should be allowed */}
          <BorderBox borderColor="black" />
        </ThemeProvider>,
      ),
    ).toThrow("Value 'black' does not exist in theme['borderColors']");
  });

  it('uses a border color value from the theme', () => {
    const {root} = render(
      <ThemeProvider theme={borderTheme}>
        <BorderBox borderColor="borderBlack" />
      </ThemeProvider>,
    );

    expect(root.findByType(RNView).props.style).toStrictEqual([
      {
        borderColor: palette.borderBlack,
      },
    ]);
  });

  it('uses a spacing value from the theme', () => {
    const {root} = render(
      <ThemeProvider theme={theme}>
        <Box padding="s" />
      </ThemeProvider>,
    );

    expect(root.findByType(RNView).props.style).toStrictEqual([
      {
        padding: 4,
      },
    ]);
  });
});
