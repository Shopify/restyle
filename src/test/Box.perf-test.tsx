/* eslint-disable jest/expect-expect */

import React from 'react';
import {View} from 'react-native';
import {measurePerformance} from 'reassure';

import {ThemeProvider} from '../context';
import createBox from '../createBox';

const theme = {
  colors: {
    background: '#fffffff',
  },
  spacing: {
    base: 16,
  },
  breakpoints: {},
  borderRadii: {
    normal: 2,
  },
};

type Theme = typeof theme;

const Box = createBox<Theme>();

describe('Performance tests', () => {
  it('box test', async () => {
    const children = new Array(100000).map((_, index) => (
      <Box
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        backgroundColor="background"
        borderRadius="normal"
        paddingHorizontal="base"
        paddingVertical="base"
        marginHorizontal="base"
        marginVertical="base"
      />
    ));

    await measurePerformance(
      <ThemeProvider theme={theme}>
        <Box>{children}</Box>
      </ThemeProvider>,
    );
  });

  it('view test', async () => {
    const children = new Array(100000).map((_, index) => (
      <View
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        style={{
          backgroundColor: '#fffffff',
          borderRadius: 2,
          paddingHorizontal: 16,
          paddingVertical: 16,
          marginHorizontal: 16,
          marginVertical: 16,
        }}
      />
    ));

    await measurePerformance(
      <ThemeProvider theme={theme}>
        <View>{children}</View>
      </ThemeProvider>,
    );
  });
});

/* eslint-enable jest/expect-expect */
