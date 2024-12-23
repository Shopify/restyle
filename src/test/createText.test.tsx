import React from 'react';
import {create as render} from 'react-test-renderer';
import {Text as RNText} from 'react-native';

import createTheme from '../createTheme';
import createText from '../createText';
import {ThemeProvider} from '../context';

const palette = {
  black: '#000000',
  grey: '#808080',
};

const fontSizes = {
  xs: 12,
  s: 14,
  m: 18,
  l: 20,
  xl: 24,
  xxl: 48,
};

const theme = createTheme({
  colors: {
    black: palette.black,
    grey: palette.grey,
  },
  spacing: {
    s: 4,
    m: 8,
  },
  fontSizes,
  textVariants: {
    defaults: {
      color: 'black',
    },
    title: {
      fontSize: 'xxl',
      fontWeight: 'bold',
      color: 'black',
    },
    subtitle: {
      fontSize: 'm',
      color: 'grey',
    },
  },
});

type Theme = typeof theme;

const Text = createText<Theme>();

describe('createText', () => {
  it('creates a bare Text component', () => {
    const {root} = render(
      <ThemeProvider theme={theme}>
        <Text>Some text</Text>
      </ThemeProvider>,
    );

    expect(root.findByType(RNText).props.children).toBe('Some text');
  });

  it('uses a color value from the theme', () => {
    const {root} = render(
      <ThemeProvider theme={theme}>
        <Text color="black">Some text</Text>
      </ThemeProvider>,
    );

    expect(root.findByType(RNText).props.style).toStrictEqual([
      {
        color: palette.black,
      },
    ]);
  });

  it('uses a font size from the theme', () => {
    const {root} = render(
      <ThemeProvider theme={theme}>
        <Text fontSize="m">Some text</Text>
      </ThemeProvider>,
    );

    expect(root.findByType(RNText).props.style).toStrictEqual([
      {
        color: palette.black,
        fontSize: fontSizes.m,
      },
    ]);
  });

  it('uses a spacing value from the theme', () => {
    const {root} = render(
      <ThemeProvider theme={theme}>
        <Text padding="s">Some text</Text>
      </ThemeProvider>,
    );

    expect(root.findByType(RNText).props.style).toStrictEqual([
      {
        padding: 4,
        color: palette.black,
      },
    ]);
  });

  it('uses a text variant from the theme', () => {
    const {root} = render(
      <ThemeProvider theme={theme}>
        <Text variant="title">Some text</Text>
      </ThemeProvider>,
    );

    expect(root.findByType(RNText).props.style).toStrictEqual([
      {
        color: palette.black,
        fontSize: 48,
        fontWeight: 'bold',
      },
    ]);
  });

  it('passes all React Native Text Style Props', () => {
    const {root} = render(
      <ThemeProvider theme={theme}>
        <Text
          color="grey"
          fontFamily="Roboto"
          fontSize="m"
          fontStyle="italic"
          fontWeight="800"
          includeFontPadding
          fontVariant={['lining-nums']}
          letterSpacing={1.2}
          lineHeight={1.4}
          textAlign="left"
          textAlignVertical="bottom"
          textDecorationColor="black"
          textDecorationLine="line-through"
          textDecorationStyle="dashed"
          textShadowColor="grey"
          textShadowOffset={{width: 4, height: 4}}
          textShadowRadius={16}
          textTransform="capitalize"
          verticalAlign="top"
          writingDirection="rtl"
          flex={1}
          maxWidth={250}
        >
          Some text
        </Text>
      </ThemeProvider>,
    );

    expect(root.findByType(RNText).props.style).toStrictEqual([
      {
        color: palette.grey,
        fontFamily: 'Roboto',
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: '800',
        includeFontPadding: true,
        fontVariant: ['lining-nums'],
        letterSpacing: 1.2,
        lineHeight: 1.4,
        textAlign: 'left',
        textAlignVertical: 'bottom',
        textDecorationColor: palette.black,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'dashed',
        textShadowColor: palette.grey,
        textShadowOffset: {width: 4, height: 4},
        textShadowRadius: 16,
        textTransform: 'capitalize',
        verticalAlign: 'top',
        writingDirection: 'rtl',
        flex: 1,
        maxWidth: 250,
      },
    ]);
  });
});
