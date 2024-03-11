---
id: variants
title: Variants
---

A variant is a form of Restyle function that maps a prop into multiple other props to use with Restyle functions. A variant needs to always map to a key in the theme.

```ts
// In theme
const theme = createTheme({
  // ...
  spacing: {
    s: 8,
    m: 16,
    l: 24,
  },
  colors: {
    cardPrimaryBackground: '#EEEEEE',
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  cardVariants: {
    defaults: {
      // We can define defaults for the variant here.
      // This will be applied after the defaults passed to createVariant and before the variant defined below.
    },
    regular: {
      // We can refer to other values in the theme here, and use responsive props
      padding: {
        phone: 's',
        tablet: 'm',
      },
    },
    elevated: {
      padding: {
        phone: 's',
        tablet: 'm',
      },
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 5},
      shadowRadius: 15,
      elevation: 5,
    }
  }
})

import {createVariant, createRestyleComponent, VariantProps} from '@shopify/restyle'
import {Theme} from './theme';

const variant = createVariant<Theme, 'cardVariants'>({
  themeKey: 'cardVariants',
  defaults: {
    margin: {
      phone: 's',
      tablet: 'm',
    },
    backgroundColor: 'cardPrimaryBackground',
  },
})

const Card = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & BoxProps<Theme>,
  Theme,
>([variant], Box)

<Card variant="elevated" />

// createVariant and createRestyleComponent are often combined into a single
// call, which improves the type hinting as well:
const Card = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
  Theme
>(
  [
    createVariant({
      themeKey: 'cardVariants',
      defaults: {
        margin: {
          phone: 's',
          tablet: 'm',
        },
        backgroundColor: 'cardPrimaryBackground',
      },
    }),
  ],
  Box,
);
```

Arguments:

- `property`: The name of the component prop that will map to a variant. Defaults to `variant`.
- `themeKey`: A key in the theme to map values from. Unlike `createRestyleFunction`, this option _is required_ to create a variant.
- `defaults`: The default values to apply before applying anything from the values in the theme.
