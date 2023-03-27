import React from 'react';
import {View} from 'react-native';
import {create as render} from 'react-test-renderer';

import {ThemeProvider} from '../context';

import {Button} from './TestButton';
import {Container, theme} from './TestContainer';

describe('Use restyle', () => {
  it('creates a button', () => {
    const button = <Button title="test" position="absolute" />;
    expect(button.props.title).toBe('test');
  });

  it('uses theme props', () => {
    const {root} = render(
      <ThemeProvider theme={theme}>
        <Container backgroundColor="background" />
      </ThemeProvider>,
    );

    expect(root.findByType(View).props.style).toStrictEqual([
      {backgroundColor: '#5A31F4'},
    ]);
  });

  it('uses theme props with variant', () => {
    const {root} = render(
      <ThemeProvider theme={theme}>
        <Container variant="spacingParent" />
      </ThemeProvider>,
    );

    expect(root.findByType(View).props.style).toStrictEqual([{padding: 0}]);
  });

  it('parent styles match theme', () => {
    const {root} = render(
      <ThemeProvider theme={theme}>
        <Container variant="spacingParent">
          <Container variant="spacingNested" />
        </Container>
      </ThemeProvider>,
    );

    expect(root.findByType(View).props.style).toStrictEqual([{padding: 0}]);
  });

  it('child styles match theme', () => {
    const {root} = render(
      <ThemeProvider theme={theme}>
        <Container variant="spacingParent">
          <Container variant="spacingNested" />
        </Container>
      </ThemeProvider>,
    );

    expect(root.findAllByType(View)[1].props.style).toStrictEqual([
      {padding: 8},
    ]);
  });
});
