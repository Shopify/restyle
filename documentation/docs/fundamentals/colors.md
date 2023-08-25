---
id: colors
title: Colors
---

When working with colors in a design system a common pattern is to have a palette including a number of base colors with darker and lighter shades, see for example the [Polaris Color Palette](https://polaris.shopify.com/design/colors#color-palette).

This palette should preferrably not be directly included as values in the theme. The naming of colors in the theme object should instead be used to assign semantic meaning to the palette, see this example:

```ts
const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,
    cardPrimaryBackground: palette.purplePrimary,
    buttonPrimaryBackground: palette.purplePrimary,
  },
});
```

Taking the time to define these semantic meanings comes with a number of benefits:

- It's easy to understand where and in what context colors are applied throughout the app
- If changes are made to the palette (e.g. the purple colors are changed to a shade of blue instead), we only have to update what the semantic names point to instead of updating all references to `purplePrimary` throughout the app.
- Even though `cardPrimaryBackground` and `buttonPrimaryBackground` point to the same color in the example above, deciding that buttons should instead be green (while cards remain purple) becomes a trivial change.
- A theme can easily be [swapped at runtime](/guides/dark-mode).
