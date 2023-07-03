---
id: predefined-components
title: Predefined components
---

This library comes with predefined functions to create a `Box` and `Text` component, as seen in action in the introductory example. These come as functions instead of ready-made components to give you a chance to provide the type of your theme object. Doing this will make all props that map to theme values have proper types configured, based on what's available in your theme.

#### Box

```tsx
// In Box.tsx
import {createBox} from '@shopify/restyle';
import {Theme} from './theme';

const Box = createBox<Theme>();

export default Box;
```

The Box component comes with the following [Restyle functions](/fundamentals/restyle-functions#predefined-restyle-functions): `backgroundColor`, `opacity`, `visible`, `layout`, `spacing`, `border`, `shadow`, `position`.

#### Text

```tsx
// In Text.tsx
import {createText} from '@shopify/restyle';
import {Theme} from './theme';

const Text = createText<Theme>();

export default Text;
```

The Text component comes with the following [Restyle functions](/fundamentals/restyle-functions#predefined-restyle-functions): `color`, `textDecorationColor`, `opacity`, `visible`, `typography`, `textShadow`, `spacing`, `layout`. It also includes a [variant](/fundamentals/variants) that picks up styles under the `textVariants` key in your theme:

```tsx
// In your theme
const theme = createTheme({
  ...,
  textVariants: {
    header: {
      fontFamily: 'ShopifySans-Bold',
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: 'black',
    },
    subheader: {
      fontFamily: 'ShopifySans-SemiBold',
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      color: 'black',
    },
    body: {
      fontFamily: 'ShopifySans',
      fontSize: 16,
      lineHeight: 24,
      color: 'black',
    },
  },
});

// In a component
<Text variant="header">Header</Text>
```
