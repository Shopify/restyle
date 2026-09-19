import React from 'react';
import {create as render, act} from 'react-test-renderer';
import {View} from 'react-native';

import createAnimatedRestyleComponent from '../createAnimatedRestyleComponent';
import createRestyleComponent from '../createRestyleComponent';
import createVariant, {VariantProps} from '../createVariant';
import {boxRestyleFunctions, BoxProps} from '../createBox';
import {ThemeProvider} from '../context';

const theme = {
  colors: {
    primary: '#5A31F4',
  },
  spacing: {
    s: 8,
  },
  borderRadii: {
    sm: 4,
    lg: 32,
  },
  zIndices: {
    base: 0,
    top: 1,
  },
  cardVariants: {
    defaults: {
      borderRadius: 'sm',
    },
    raised: {
      borderRadius: 'lg',
    },
  },
};

type Theme = typeof theme;

/**
 * Stands in for `Animated.createAnimatedComponent(View)` without depending on
 * react-native-reanimated in the test suite. It reproduces the exact mechanism
 * behind #355: once "settled" (triggered here via the imperative `settle` method,
 * standing in for Reanimated's FORCE_REACT_RENDER_FOR_SETTLED_ANIMATIONS flag), it
 * spreads the given raw style values as top-level props onto the plain `View` it
 * renders internally — via its own setState/render, never by re-rendering with new
 * props passed down from its parent. That's the crux of what ordering fixes: those
 * settled props land on this component's own child, not back up on whatever wraps it.
 */
class MockAnimatedView extends React.Component<
  {style?: unknown; [key: string]: unknown},
  {settled: {[key: string]: unknown} | null}
> {
  state: {settled: {[key: string]: unknown} | null} = {settled: null};

  // Intentionally public: tests call this through a ref to simulate the
  // imperative settle event a real animation library fires internally.
  // eslint-disable-next-line @shopify/react-prefer-private-members
  settle(values: {[key: string]: unknown}) {
    this.setState({settled: values});
  }

  render() {
    const {settled} = this.state;
    return <View {...this.props} {...(settled ?? {})} />;
  }
}

const AnimatedBox = createAnimatedRestyleComponent<
  Theme,
  typeof MockAnimatedView
>(MockAnimatedView);

describe('createAnimatedRestyleComponent', () => {
  it('does not throw when a settled animation spreads a raw color value', () => {
    let instance: MockAnimatedView | null = null;
    const {root} = render(
      <ThemeProvider theme={theme}>
        <AnimatedBox ref={(r: MockAnimatedView | null) => (instance = r)} />
      </ThemeProvider>,
    );

    expect(() => {
      act(() => {
        instance!.settle({backgroundColor: 'rgba(255,209,102,1)'});
      });
    }).not.toThrow();

    expect(root.findByType(View).props.backgroundColor).toBe(
      'rgba(255,209,102,1)',
    );
  });

  it('does not throw when a settled animation spreads raw borderRadius and zIndex values', () => {
    let instance: MockAnimatedView | null = null;
    const {root} = render(
      <ThemeProvider theme={theme}>
        <AnimatedBox ref={(r: MockAnimatedView | null) => (instance = r)} />
      </ThemeProvider>,
    );

    expect(() => {
      act(() => {
        instance!.settle({borderRadius: 13, zIndex: 1});
      });
    }).not.toThrow();

    expect(root.findByType(View).props).toMatchObject({
      borderRadius: 13,
      zIndex: 1,
    });
  });

  it('still resolves theme tokens normally', () => {
    const {root} = render(
      <ThemeProvider theme={theme}>
        <AnimatedBox backgroundColor="primary" borderRadius="lg" zIndex="top" />
      </ThemeProvider>,
    );

    expect(root.findByType(View).props.style).toStrictEqual([
      {backgroundColor: '#5A31F4', borderRadius: 32, zIndex: 1},
    ]);
  });

  it("still throws on a genuine typo'd theme key", () => {
    expect(() => {
      render(
        <ThemeProvider theme={theme}>
          {/* @ts-expect-error intentionally invalid theme key, to prove typo detection is unaffected */}
          <AnimatedBox backgroundColor="primaryy" />
        </ThemeProvider>,
      );
    }).toThrow("Value 'primaryy' does not exist in theme['colors']");
  });

  it('supports variants when composed with createVariant, same as a non-animated custom component', () => {
    // `Box` (and so `createAnimatedRestyleComponent`, which shares its restyle
    // functions) doesn't bundle variant support out of the box — a variant-aware
    // component is composed explicitly via createRestyleComponent, same as the
    // "Custom components" guide shows for non-animated components. This proves
    // that composition still works with an animated base component.
    const cardVariant = createVariant<Theme, 'cardVariants'>({
      themeKey: 'cardVariants',
    });
    type Props = BoxProps<Theme> &
      VariantProps<Theme, 'cardVariants'> &
      React.ComponentProps<typeof MockAnimatedView>;
    const AnimatedCard = createRestyleComponent<Props, Theme>(
      [...boxRestyleFunctions, cardVariant],
      MockAnimatedView,
    );

    const {root} = render(
      <ThemeProvider theme={theme}>
        <AnimatedCard variant="raised" />
      </ThemeProvider>,
    );

    expect(root.findByType(View).props.style).toStrictEqual([
      {borderRadius: 32},
    ]);
  });

  it('supports responsive props', () => {
    const {root} = render(
      <ThemeProvider theme={{...theme, breakpoints: {phone: 0, tablet: 768}}}>
        <AnimatedBox borderRadius={{phone: 'sm', tablet: 'lg'}} />
      </ThemeProvider>,
    );

    expect(root.findByType(View).props.style).toStrictEqual([
      {borderRadius: 4},
    ]);
  });

  it('forwards refs to the wrapped animated component', () => {
    const spy = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <AnimatedBox ref={spy} testID="ANIMATED_BOX" />
      </ThemeProvider>,
    );

    expect(spy).toHaveBeenCalledWith(expect.any(MockAnimatedView));
  });
});
