import React from 'react';
import {create as render, act} from 'react-test-renderer';
import {View, Dimensions, ViewProps} from 'react-native';

import createRestyleComponent from '../createRestyleComponent';
import {
  backgroundColor,
  BackgroundColorProps,
  SpacingProps,
  spacing,
  OpacityProps,
  opacity,
} from '../restyleFunctions';
import {ThemeProvider} from '../context';

const theme = {
  colors: {
    coral: '#FFE6E4',
  },
  spacing: {},
  breakpoints: {
    phone: 0,
    tablet: 376,
  },
  opacities: {
    barelyVisible: 0.1,
    almostOpaque: 0.9,
  },
};
type Theme = typeof theme;

jest.mock('react-native/Libraries/Utilities/Dimensions', () => {
  return {
    get: () => ({
      width: 375,
      height: 667,
    }),
    addEventListener: jest.fn(),
  };
});
const Component = createRestyleComponent<
  BackgroundColorProps<Theme> &
    SpacingProps<Theme> &
    OpacityProps<Theme> &
    ViewProps,
  Theme
>([backgroundColor, spacing, opacity]);

describe('createRestyleComponent', () => {
  describe('creates a component that', () => {
    beforeEach(() => {
      (Dimensions.addEventListener as jest.Mock).mockClear();
    });

    it('passes styles based on the given props', () => {
      const {root} = render(<Component opacity={0.5} />);
      expect(root.findByType(View).props.style).toStrictEqual([{opacity: 0.5}]);
    });

    it('appends style prop to the end', () => {
      const {root} = render(<Component opacity={0.5} style={{width: 100}} />);
      expect(root.findByType(View).props.style).toStrictEqual([
        {opacity: 0.5},
        {width: 100},
      ]);
    });

    it('does not pass styling properties to the child', () => {
      const {root} = render(<Component opacity={0.5} pointerEvents="auto" />);
      expect(root.findByType(View).props).toStrictEqual({
        style: [{opacity: 0.5}],
        pointerEvents: 'auto',
      });
    });

    it('picks up values from the theme provided with ThemeProvider', () => {
      const {root} = render(
        <ThemeProvider theme={theme}>
          <Component backgroundColor="coral" />
        </ThemeProvider>,
      );
      expect(root.findByType(View).props).toStrictEqual({
        style: [{backgroundColor: '#FFE6E4'}],
      });
    });

    it('re-renders with styles specific to the screen size when dimensions change', async () => {
      (Dimensions.addEventListener as jest.Mock).mockClear();
      const {root} = render(
        <ThemeProvider theme={theme}>
          <Component opacity={{phone: 0.5, tablet: 0.8}} />
        </ThemeProvider>,
      );
      expect(root.findByType(View).props).toStrictEqual({
        style: [{opacity: 0.5}],
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      const {calls} = (Dimensions.addEventListener as jest.Mock).mock;
      const onChange = calls[calls.length - 1][1];
      act(() => {
        onChange({window: {width: 768, height: 1024}});
      });
      expect(root.findByType(View).props).toStrictEqual({
        style: [{opacity: 0.8}],
      });
    });

    it('forwards refs', () => {
      const spy = jest.fn();
      render(<Component ref={spy} testID="RENDERED_COMPONENT" />);

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          props: expect.objectContaining({testID: 'RENDERED_COMPONENT'}),
        }),
      );
    });
  });
});
