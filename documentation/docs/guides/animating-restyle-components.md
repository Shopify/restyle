---
id: animating-restyle-components
title: Animating Restyle components
---

Restyle doesn't depend on any animation library, but it's common to want to animate a
themed component — for example, animating a `Box`'s `borderRadius` or `backgroundColor`
between two theme values.

## Nest the animated component inside Restyle, not the other way around

Given a themed component, there are two ways to make it animatable:

```tsx
// A: animated outer, Restyle inner
const AnimatedBox = Animated.createAnimatedComponent(createBox<Theme>());
```

```tsx
// B: Restyle outer, animated inner
const AnimatedBox = createAnimatedRestyleComponent<Theme, typeof Animated.View>(
  Animated.createAnimatedComponent(View),
);
```

These look interchangeable, but **only B is safe with `react-native-reanimated` 4.4+**.

Reanimated 4.4 introduced a default-on performance flag,
`FORCE_REACT_RENDER_FOR_SETTLED_ANIMATIONS`. Once an animation settles, Reanimated
re-renders the component it wraps with the resolved style values spread on as
top-level props, in addition to `style`:

```
borderRadius: 13
backgroundColor: 'rgba(255,209,102,1)'
```

In ordering **A**, the component Reanimated wraps _is_ the Restyle component, so those
resolved values land as `borderRadius` / `backgroundColor` props on it — and Restyle
treats any theme-key prop as a token lookup. A raw number or color string is not a key
in your theme, so `getThemeValue` throws:

```
Value '13' does not exist in theme['borderRadii']
Value 'rgba(255,209,102,1)' does not exist in theme['colors']
```

In ordering **B**, Reanimated wraps a plain `View` that sits _inside_ Restyle's
`BaseComponent`. The settled props get spread onto that inner `View` — a component
Restyle's props never pass back through — so there's nothing to collide with. Restyle
only ever sees the props it was given in JSX (`style`, and whichever theme props you
passed explicitly).

## `createAnimatedRestyleComponent`

`createAnimatedRestyleComponent` is a small helper for ordering B: it's `createBox`
with its `Props` generic inferred from the animated component you hand it, so you get
that component's own prop types (its `style` prop in particular) without having to
redeclare them yourself.

```tsx
import {Animated, View} from 'react-native';
// or, for react-native-reanimated:
// import Animated from 'react-native-reanimated';
import {createAnimatedRestyleComponent, useTheme} from '@shopify/restyle';
import {Theme} from './theme';

const AnimatedBox = createAnimatedRestyleComponent<Theme, typeof Animated.View>(
  Animated.createAnimatedComponent(View),
);

const Example = () => {
  const {borderRadii} = useTheme<Theme>();
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    borderRadius: interpolate(progress.value, [0, 1], [
      borderRadii.sm,
      borderRadii.lg,
    ]),
  }));

  return (
    <AnimatedBox
      backgroundColor="cardBackground"
      width={120}
      height={120}
      style={animatedStyle}
    />
  );
};
```

Restyle itself never imports an animation library — `createAnimatedRestyleComponent`
just takes whatever already-animated component you construct and wraps it, so this
works the same way with `react-native-reanimated`, the built-in `Animated` API, or
anything else that produces a component accepting a `style` prop.

The component `createAnimatedRestyleComponent` returns behaves exactly like `Box`:
same restyle functions, same ref forwarding, and it composes with
[variants](/fundamentals/variants) the same way any [custom component](/fundamentals/components/custom-components)
does — pass `createVariant(...)` alongside `boxRestyleFunctions` to
`createRestyleComponent` directly if you need a variant-aware animated component.

## If you're not using `createAnimatedRestyleComponent`

The same ordering rule applies if you build your own animated component instead —
with `createRestyleComponent` or `createBox` directly:

```tsx
const AnimatedBox = createBox<Theme, Animated.AnimateProps<ViewProps>>(
  Animated.createAnimatedComponent(View),
);
```

The important part isn't the helper, it's the nesting order: give Restyle the
already-animated component as its `BaseComponent`, don't wrap a Restyle component in
`Animated.createAnimatedComponent`.
