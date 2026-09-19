import React from 'react';

import createBox from './createBox';
import {BaseTheme} from './types';

/**
 * Wraps an already-animated component (e.g. `Animated.createAnimatedComponent(View)`
 * from `react-native-reanimated`, or `Animated.View` from the built-in `Animated` API)
 * with Restyle's `Box` props, inferring the wrapped component's own prop types (its
 * `style` prop in particular) instead of requiring them to be re-declared by hand.
 *
 * Restyle never imports an animation library itself: the caller constructs the animated
 * component and hands it in, so this stays a zero-dependency wrapper around `createBox`.
 *
 * Ordering matters: nest the animated component *inside* Restyle
 * (`createAnimatedRestyleComponent(Animated.createAnimatedComponent(View))`), not the
 * other way around (`Animated.createAnimatedComponent(createBox())`). Outside-in, a
 * library that re-renders with resolved style values spread as top-level props (as
 * react-native-reanimated 4.4+ does once an animation settles, when its
 * `FORCE_REACT_RENDER_FOR_SETTLED_ANIMATIONS` flag is on) lands those raw values in
 * Restyle's theme-token prop namespace. Inside-out, those props are spread on the
 * plain wrapped component instead, never reaching Restyle's prop parsing. See the
 * "Animating Restyle components" guide for the full explanation and an example.
 */
const createAnimatedRestyleComponent = <
  Theme extends BaseTheme,
  AnimatedComponentType extends React.ComponentType<any>,
  EnableShorthand extends boolean = true,
>(
  AnimatedComponent: AnimatedComponentType,
) => {
  return createBox<
    Theme,
    React.ComponentProps<AnimatedComponentType>,
    EnableShorthand
  >(AnimatedComponent);
};

export default createAnimatedRestyleComponent;
